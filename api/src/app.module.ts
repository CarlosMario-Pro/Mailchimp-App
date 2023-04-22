import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailchimpModule } from './mailchimp/mailchimp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MailchimpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
