import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  isTyping = false;
  userPrompt = '';
  chatHistory: { sender: 'user'|'bot', text: string }[] = [];

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private api: ApiService) {}

  scrollToBottom() {
    setTimeout(() => {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }

  sendMessage() {
  if (!this.userPrompt.trim()) return;

  const userMsg = this.userPrompt;

  this.chatHistory.push({
    sender: 'user',
    text: userMsg
  });

  const payload = { prompt_message: userMsg };
  this.userPrompt = '';
  this.scrollToBottom();

  this.isTyping = true;

  this.api.sendChat(payload).subscribe({
    next: (res: any) => {
      this.isTyping = false;

      this.chatHistory.push({
        sender: 'bot',
        text: res.result || 'No response'
      });

      this.scrollToBottom();
    },
    error: (err) => {
      this.isTyping = false;

      this.chatHistory.push({
        sender: 'bot',
        text: 'API Error: ' + err.message
      });

      this.scrollToBottom();
    }
  });
}

}
