import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatBotService, ClientMessage, BotResponse } from '../chat-bot.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  providers: [ChatBotService],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  messages: (ClientMessage | BotResponse)[] = [];
  message = '';
  private sub!: Subscription;

  // 🧠 Pulled internally (no more @Input)
  orderId!: number;
  userId!: number;
  token!: string;

  constructor(public chatService:ChatBotService) {}

  ngOnInit() {
    // ✅ Get from localStorage or a service
    this.orderId = Number(localStorage.getItem('selectedOrderId'));
    this.userId = Number(localStorage.getItem('userId'));
    this.token = localStorage.getItem('jwtToken')!;

    if (!this.orderId || !this.token || !this.userId) {
      console.error('❌ Missing orderId, userId or token.');
      return;
    }

    this.chatService.connect(this.orderId, this.token, this.userId);
    this.sub = this.chatService.messages$.subscribe(msgs => this.messages = msgs);
  }

  sendMessage() {
    if (!this.message.trim()) return;

    const msg: ClientMessage = {
      orderId: this.orderId,
      userId: this.userId,
      message: this.message
    };
    this.chatService.sendMessage(msg);
    this.message = '';
  }

  sendQuickReply(reply: string) {
    this.chatService.sendMessage({
      orderId: this.orderId,
      userId: this.userId,
      message: reply
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.chatService.uploadImage(file).subscribe(res => {
        const msg: ClientMessage = {
          orderId: this.orderId,
          userId: this.userId,
          foodUrl: res.url
        };
        this.chatService.sendMessage(msg);
      });
    }
  }

  isClientMessage(msg: ClientMessage | BotResponse): msg is ClientMessage {
    return (msg as ClientMessage).userId !== undefined;
  }

  isBotResponse(msg: ClientMessage | BotResponse): msg is BotResponse {
    return (msg as BotResponse).reply !== undefined;
  }

  ngOnDestroy() {
    this.chatService.disconnect();
    this.sub.unsubscribe();
  }
}
