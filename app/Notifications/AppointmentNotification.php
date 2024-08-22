<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Appointment;

class AppointmentNotification extends Notification
{
    use Queueable;

    public $appointment;
    public $eventType;

    /**
     * Create a new notification instance.
     *
     * @param \App\Models\Appointment $appointment
     * @param string $eventType
     */
    public function __construct(Appointment $appointment, string $eventType=null)
    {
        $this->appointment = $appointment;
        $this->eventType = $eventType;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     */
    public function toDatabase(object $notifiable): array
    {
        $message = $this->generateMessage();

        return [
            'appointment_id' => $this->appointment->id,
            'farmer_name' => $this->appointment->farmer->name,
            'appointment_date' => $this->appointment->appointment_date,
            'message' => $message,
            'title' => 'Appointment Update',
            'eoProfile' => $this->appointment->extensionWorker->profile_photo_url,
        ];
    }

    /**
     * Generate the message based on the event type.
     *
     * @return string
     */
    protected function generateMessage(): string
    {
        switch ($this->eventType) {
            case 'Requested':
                return 'You have a new appointment request.';
            case 'date_changed':
                return 'The appointment date has been changed.';
            case 'Completed':
                return 'The appointment has been completed.';
            case 'Canceled':
                return 'The appointment has been canceled.';
            default:
                return 'An update has been made to your appointment.';
        }
    }
}
