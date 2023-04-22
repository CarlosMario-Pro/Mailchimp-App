import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MailchimpService } from './mailchimp.service';
import { CreateMailchimpDto } from './dto/create-mailchimp.dto';
import { UpdateMailchimpDto } from './dto/update-mailchimp.dto';

@Controller('mailchimp')
export class MailchimpController {
  constructor(private readonly mailchimpService: MailchimpService) {}

  //Route to list information
  @Get()
  async getAllLists() {
    try {
      return await this.mailchimpService.getAllLists();
    } catch (err) {
      throw new Error(`Unable to get all lists: ${err.message}`);
    }
  }

  //Path to get all contacts in the list
  @Get(':listId/members')
  async getListMembersInfo(@Param('listId') listId: string) {
    try {
      return await this.mailchimpService.getListMembersInfo(listId);
    } catch (error) {
      throw new Error(`Unable to get list members info: ${error.message}`);
    }
  }

  //Path to get the detail of a contact from the list
  @Get(':listId/members/:id')
  async getListMember(
    @Param('listId') listId: string,
    @Param('id') id: string,
  ) {
    try {
      const listMember = await this.mailchimpService.getListMember(listId, id);
      return listMember;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Path to create a contact in the list
  @Post(':listId/members')
  async addListMember(
    @Param('listId') listId: string,
    @Body() createMailchimpDto: CreateMailchimpDto,
  ) {
    try {
      return await this.mailchimpService.addListMember(
        listId,
        createMailchimpDto,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Path to create a batch of contacts in CSV file
  @Post(':listId/batch-members')
  async batchListMembers(
    @Param('listId') listId: string,
    @Body() createMailchimpDto,
  ) {
    try {
      return this.mailchimpService.batchListMembers(listId, createMailchimpDto);
    } catch (error) {
      throw new HttpException(
        `Unable to update list member: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Route to update a contact in the list
  @Put(':listId/members/:memberId')
  async updateListMember(
    @Param('listId') listId: string,
    @Param('memberId') memberId: string,
    @Body() updateMailchimpDto: UpdateMailchimpDto,
  ) {
    try {
      return this.mailchimpService.updateListMember(
        listId,
        memberId,
        updateMailchimpDto,
      );
    } catch (error) {
      throw new HttpException(
        `Unable to update list member: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Route to remove a contact from the list
  @Delete(':listId/members/:id')
  async deleteListMember(
    @Param('listId') listId: string,
    @Param('id') id: string,
  ) {
    try {
      const deletedMember = await this.mailchimpService.deleteListMember(
        listId,
        id,
      );
      return deletedMember;
    } catch (err) {
      throw new HttpException(
        `Unable to delete list member: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
