const base = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const make = (children) => function Icon(props) { return <svg {...base} {...props}>{children}</svg>; };

export const FedoraIcon = make(<><path d="M7 9c0-3 2-5 5-5s5 2 5 5M4 10h16" /><path d="M8 10v2a4 4 0 0 0 8 0v-2" /><path d="M4 21c0-3 3-5 8-5s8 2 8 5" /></>);
export const PistolIcon = make(<path d="M3 7h16l2 2v3h-9l-1.5 3.500V19H7.500v-3.500L6 12H3V7Z" />);
export const CarIcon = make(<><path d="M3 12l2-5h14l2 5v5H3v-5Z" /><path d="M3 12h18" /><circle cx="7.5" cy="15" r="1" /><circle cx="16.5" cy="15" r="1" /></>);
export const GroupIcon = make(<><circle cx="12" cy="8" r="3" /><circle cx="5.5" cy="10" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M6 20c0-3 2.5-5 6-5s6 2 6 5M1.5 18c0-2 1.5-3.5 4-3.500M22.5 18c0-2-1.5-3.5-4-3.5" /></>);
export const CalendarIcon = make(<><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></>);
export const StarIcon = make(<><circle cx="12" cy="12" r="9" /><path d="m12 7.5 1.5 3.3 3.5.4-2.6 2.4.7 3.4-3.1-1.7-3.1 1.7.7-3.400L7 11.200l3.5-.4L12 7.500Z" /></>);
export const GlobeIcon = make(<><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>);
export const ShieldIcon = make(<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>);
export const LockIcon = make(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3M12 15.500v.01" /></>);
export const MailIcon = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
export const ArrowIcon = make(<path d="M5 12h14m-6-6 6 6-6 6" />);
export const ClockIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const LinkIcon = make(<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.700l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.700l1-1" />);
