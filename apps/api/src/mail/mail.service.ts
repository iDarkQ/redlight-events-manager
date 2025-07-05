import { Injectable } from "@nestjs/common";
import { Recipient, EmailParams, MailerSend, Sender } from "mailersend";
import { EventDto } from "~/event/dto/event.dto";
import { UserDto } from "~/user/dto/user.dto";
import { baseUrl } from "~/utils/url";

@Injectable()
export class MailService {
    async createEventEmail(users: UserDto[], event: EventDto) {
        const mailerSend = new MailerSend({
            apiKey: process.env.MAILERSEND_SECRET ?? "",
        });

        const sentFrom = new Sender(process.env.MAILERSEND_SENDER_EMAIL ?? "", "Redlight Team");

        for (const user of users) {
            const recipient = [new Recipient(user.email, user.name)];
            const personalization = [
                {
                    email: user.email,
                    data: {
                        customer: {
                            first_name: user.name,
                        },
                        store_url: baseUrl + "/event/view/" + event.id,
                    },
                },
            ];

            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipient)
                .setReplyTo(sentFrom)
                .setSubject("New Event At Redlight")
                .setTemplateId(process.env.MAILERSEND_TEMPLATED_ID ?? "")
                .setPersonalization(personalization);

            await mailerSend.email.send(emailParams);
        }
    }
}
