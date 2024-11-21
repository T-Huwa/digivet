<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserSignUpRequest extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $role;

    /**
     * Create a new message instance.
     *
     * @param string $name
     * @param string $email
     * @param string $role
     */
    public function __construct(string $name, string $email, string $role)
    {
        $this->name = $name;
        $this->email = $email;
        $this->role = $role;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Signup Request',
            from: new Address($this->email, $this->name),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'admin.signup-request',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
