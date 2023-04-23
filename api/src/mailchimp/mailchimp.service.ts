import { Injectable } from '@nestjs/common';
import mailchimp from './MailchimpConfig';
import { CreateMailchimpDto } from './dto/create-mailchimp.dto';
import { UpdateMailchimpDto } from './dto/update-mailchimp.dto';

@Injectable()
export class MailchimpService {
  async getAllLists() {
    try {
      const response = await mailchimp.lists.getAllLists();
      return response;
    } catch (error) {
      throw new Error('Failed to bring the meta-information from your lists');
    }
  }

  async getListMembersInfo(listId: string) {
    try {
      const response = await mailchimp.lists.getListMembersInfo(listId, {
        count: 120,
      });
      return response;
    } catch (err) {
      throw new Error(`Unable to get list members: ${err.message}`);
    }
  }

  async getListMember(listId: string, id: string) {
    try {
      const response = await mailchimp.lists.getListMember(listId, id);
      return response;
    } catch (err) {
      throw new Error(`Unable to get list member: ${err.message}`);
    }
  }

  async addListMember(listId: string, createMailchimpDto: CreateMailchimpDto) {
    try {
      const searchResult = await mailchimp.searchMembers.search(listId, {
        query: createMailchimpDto.email,
      });
      if (searchResult.exact_matches.members.length > 0) {
        return 'ya existe el correo';
      }

      const memberData = {
        email_address: createMailchimpDto.email,
        status: 'subscribed', // Debe de ir
        merge_fields: {
          FNAME: createMailchimpDto.firstName,
          LNAME: createMailchimpDto.lastName,
          ADDRESS: {
            addr1: createMailchimpDto.address.addr1,
            addr2: createMailchimpDto.address.addr2,
            city: createMailchimpDto.address.city,
            state: createMailchimpDto.address.state,
            country: createMailchimpDto.address.country,
            zip: createMailchimpDto.address.zip,
          },
          PHONE: createMailchimpDto.phoneNumber,
        },
      };
      const response = await mailchimp.lists.addListMember(listId, memberData);
      return response;
    } catch (err) {
      throw new Error(`Unable to add list member: ${err.message}`);
    }
  } // { "email": "mcsft@socialgoodsoftware.com", "firstName": "Joannie", "lastName": "Turner", "address": {  "addr1": "Cra 20", "addr2": "Cra 20","city": "La Dorada", "state": "Caldas", "country": "Colombia", "zip": "135070" }, "phoneNumber": "(454) 788-7140" }

  async batchListMembers(
    listId: string,
    createMailchimpDto: CreateMailchimpDto[],
  ) {
    try {
      const uniqueEmails = {};
      const filteredData = createMailchimpDto.filter((item) => {
        if (!uniqueEmails[item.email]) {
          uniqueEmails[item.email] = true;
          return true;
        }
        return false;
      });

      const membersData = filteredData.map((contact) => {
        return {
          email_address: contact.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: contact.firstName,
            LNAME: contact.lastName,
            ADDRESS: {
              addr1: contact.address.addr1,
              addr2: contact.address.addr2,
              city: contact.address.city,
              state: contact.address.state,
              country: contact.address.country,
              zip: contact.address.zip,
            },
            PHONE: contact.phoneNumber,
          },
        };
      });

      const response = await mailchimp.lists.batchListMembers(listId, {
        members: membersData,
        update_existing: true,
      });

      return response;
    } catch (err) {
      throw new Error(`Unable to add list members: ${err.message}`);
    }
  }

  async updateListMember(
    listId: string,
    memberId: string,
    updateMailchimpDto: UpdateMailchimpDto,
  ) {
    try {
      const memberData = {
        email_address: updateMailchimpDto.email,
        merge_fields: {
          FNAME: updateMailchimpDto.firstName,
          LNAME: updateMailchimpDto.lastName,
          ADDRESS: {
            addr1: updateMailchimpDto.address.addr1,
            addr2: updateMailchimpDto.address.addr2,
            city: updateMailchimpDto.address.city,
            state: updateMailchimpDto.address.state,
            country: updateMailchimpDto.address.country,
            zip: updateMailchimpDto.address.zip,
          },
          PHONE: updateMailchimpDto.phoneNumber,
        },
      };
      const response = await mailchimp.lists.updateListMember(
        listId,
        memberId,
        memberData,
      );
      return response;
    } catch (err) {
      throw new Error(`Unable to update list member: ${err.message}`);
    }
  } // { "listId": "1b8c4df414", "email": "marcela@socialgoodsoftware.com", "firstName": "Marcela", "lastName": "Turner", "address": { "addr1": "Cra 20", "city": "La Dorada", "state": "Caldas", "country": "Colombia", "zip": "135070" }, "phoneNumber": "(454) 788-7140", "birthday": "1990/03/13" }

  async deleteListMember(listId: string, id: string) {
    try {
      const member = await mailchimp.lists.getListMember(listId, id);
      await mailchimp.lists.deleteListMember(listId, id);
      return member;
    } catch (err) {
      throw new Error(`Unable to delete list member: ${err.message}`);
    }
  }
}
