
import { Program, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Workshops', href: '#programs' },
  { label: 'C.A.M.P.', href: '#camp' },
  { label: 'Private Coaching', href: '#coaching' },
  { label: 'About', href: '#about' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

const PAYPAL_BASE = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=actlikeyouknowworkshops@gmail.com&currency_code=USD";

export const PROGRAMS: Program[] = [
  {
    id: 'camp',
    title: "C.A.M.P. Monthly Mentorship",
    price: '$35.00',
    priceDetail: 'Monthly Subscription',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/image0%20(3).jpeg',
    description: "Celebrity Actor's Mentoring Program. Special guest this month: Carl Payne (Cole from 'Martin'). February 2nd @ 8pm EST.",
    features: [
      "Guest: Carl Payne ('Martin', 'The Cosby Show')",
      "Live mentorship & Q&A session",
      "Audition & casting notices",
      "Interactive ZOOM environment"
    ],
    isFeatured: true,
    paypalLink: `${PAYPAL_BASE}&item_name=C.A.M.P. (Celebrity Actor's Mentoring Program) Monthly&amount=35.00`
  },
  {
    id: 'virtual',
    title: 'Virtual Acting Workshop',
    price: '$35.00',
    priceDetail: 'Next Session: Jan 21st',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/image0%20(13)-82e2924.png',
    description: "Interactive session focusing on your last self-tape submission. Learning what to do and what NOT to do to secure the role.",
    features: [
      "Extremely interactive Zoom session",
      "Self-tape submission evaluation",
      "Hosted by Dennis L.A. White",
      "Book-the-role techniques"
    ],
    paypalLink: `${PAYPAL_BASE}&item_name=C.A.M.P. Virtual Workshop&amount=35.00`
  },
  {
    id: 'camp-year',
    title: 'C.A.M.P. Annual Pass',
    price: '$300.00',
    priceDetail: '$120.00 Savings',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/image1%20(2).png',
    description: "Complete access to the C.A.M.P. community for a full year. Priority access to all guest speakers and industry tools.",
    features: [
      "Full year of live mentorship",
      "Priority audition updates",
      "Exclusive career building tools",
      "Accountability & growth community"
    ],
    paypalLink: `${PAYPAL_BASE}&item_name=C.A.M.P. Year Discount&amount=300.00`
  },
  {
    id: 'coaching',
    title: 'Monthly Private Coaching',
    price: '$250.00',
    priceDetail: '4 One-Hour Sessions',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/Yellowshirtteaching.jpg',
    description: "1-on-1 refinement with Dennis L.A. White or top industry coaches. Design to personally take your career to the next level.",
    features: [
      "Four private 1-hour sessions",
      "Talent refinement & elevation",
      "Personal industry roadmap",
      "Working actor mentorship"
    ],
    paypalLink: `${PAYPAL_BASE}&item_name=MONTHLY PRIVATE COACHING&amount=250.00`
  },
  {
    id: 'consulting',
    title: 'Career Consultation',
    price: '$75.00',
    priceDetail: 'Strategic Deep-Dive',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/image3%20(1).jpeg',
    description: "Assessment of your career profile. Evaluation of your current skills and industry positioning to raise your market profile.",
    features: [
      "Career status evaluation",
      "Industry profile assessment",
      "Personalized ZOOM session",
      "Strategic career planning"
    ],
    paypalLink: `${PAYPAL_BASE}&item_name=CAREER CONSULTATION&amount=75.00`
  },
  {
    id: 'intensive',
    title: 'Celebrity Acting Intensive',
    price: '$500.00',
    priceDetail: 'Industry Professionals Only',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/image0%20(6).jpeg',
    description: "Design specifically for actors with existing credits. Evaluation of previous performances to pinpoint elevation areas.",
    features: [
      "Credit vetting required",
      "Two deep-dive performance sessions",
      "Total performance breakdown",
      "Elite status refinement"
    ],
    paypalLink: `${PAYPAL_BASE}&item_name=CELEBRITY ACTING INTENSIVE&amount=500.00`
  },
  {
    id: 'student',
    title: 'Current Student Private',
    price: '$250.00',
    priceDetail: '6-Month Commitment',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/dfdfe3df-804e-44eb-bb6a-a9ee12ee2bd1/teachingpic5.jpg',
    description: "Discounted monthly rate for active 'Act Like You Know' students. Requires dedication and consistent effort.",
    features: [
      "Active student exclusive rate",
      "Four 1-hour private sessions",
      "Ongoing performance training",
      "6-month development track"
    ],
    paypalLink: `${PAYPAL_BASE}&item_name=CURRENT STUDENTS MONTHLY PRIVATE COACHING&amount=250.00`
  }
];

export const HIGHLIGHTS = [
  {
    title: "Pro Mentors",
    desc: "Learn from professional actors, directors, and producers with actual working credits."
  },
  {
    title: "Hands-On",
    desc: "Our sessions provide hands-on experience ensuring you're confident to book more roles."
  },
  {
    title: "Connectivity",
    desc: "Share experiences with other professionals and learn from their industry growth."
  },
  {
    title: "Career Prospects",
    desc: "Improve your standing with knowledge needed to succeed in the modern film industry."
  },
  {
    title: "Flexible Scheduling",
    desc: "Attend sessions through Zoom and FaceTime at a time that works best for you."
  },
  {
    title: "Affordable Value",
    desc: "Priced to accommodate those who have the desire but must respect a budget."
  }
];
