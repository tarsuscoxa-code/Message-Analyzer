
import type { Notification } from './types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', sender: 'Slack', text: '@channel Don\'t forget the team-wide meeting at 3 PM EST today to discuss Q3 results. Link in channel.', timestamp: Date.now() - 10000 },
  { id: '2', sender: 'Chase Bank', text: 'A payment of $1,250.50 to "AMAZON WEB SERVICES" is scheduled for 07/28. Your available balance is $3,450.12.', timestamp: Date.now() - 20000 },
  { id: '3', sender: 'Gmail', text: 'Sarah Connor - Project Phoenix Deadline - Hi team, just a reminder that the final report for Project Phoenix is due tomorrow EOD.', timestamp: Date.now() - 30000 },
  { id: '4', sender: 'DoorDash', text: 'Your order from "The Salty Spitoon" is on its way! Your driver, Patrick, should arrive in about 15 minutes.', timestamp: Date.now() - 40000 },
  { id: '5', sender: 'Instagram', text: 'plankton_official and 12 others liked your photo.', timestamp: Date.now() - 50000 },
  { id: '6', sender: 'Weather App', text: 'Warning: Severe Thunderstorm Watch issued for your area until 9 PM tonight. Stay safe!', timestamp: Date.now() - 60000 },
  { id: '7', sender: 'Discord', text: 'You have a new message from Squidward in #band-practice: "Are we still on for tonight?"', timestamp: Date.now() - 70000 },
  { id: '8', sender: 'ASOS', text: '🔥 50% OFF EVERYTHING! Your summer wardrobe is calling. Don\'t miss out on these hot deals. Shop now!', timestamp: Date.now() - 80000 },
  { id: '9', sender: 'Calendar', text: 'Reminder: Dentist Appointment at 10:30 AM tomorrow.', timestamp: Date.now() - 90000 },
  { id: '10', sender: 'Mom', text: 'Hey sweetie, can you call me back when you get a chance? Just wanted to check in. Love you!', timestamp: Date.now() - 100000 },
  { id: '11', sender: 'YouTube', text: 'MrBeast just uploaded a new video: "I Survived 100 Days in Antarctica!"', timestamp: Date.now() - 110000 },
  { id: '12', sender: 'FedEx', text: 'Your package with tracking #7812... is out for delivery today.', timestamp: Date.now() - 120000 },
];
