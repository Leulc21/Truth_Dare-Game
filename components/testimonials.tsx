import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import { ComponentProps } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivers",
    designation: "Casual Gamer",
    company: "Community Player",
    testimonial:
      "Creating a game with my own rules and difficulty was so easy. Playing with friends has never been this fun!",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 2,
    name: "Maya Thompson",
    designation: "Game Night Host",
    company: "Board Game Club",
    testimonial:
      "The multiplayer feature is amazing! Our group uses it every weekend. Super smooth and enjoyable experience.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Leo Fernandez",
    designation: "Content Creator",
    company: "YouTube",
    testimonial:
      "The customizable environment and challenges help me create unique content. My viewers love the gameplay!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Hannah Kim",
    designation: "Student",
    company: "University of Gaming",
    testimonial:
      "The UI is clean, fast, and simple. I love how the game saves all my sessions automatically.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 5,
    name: "James Miller",
    designation: "Developer",
    company: "Indie Games",
    testimonial:
      "As someone who builds games, I’m impressed with the flow here. Creating a new game takes seconds!",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    id: 6,
    name: "Olivia Carter",
    designation: "Party Planner",
    company: "EventHouse",
    testimonial:
      "This app is my go-to for parties. Everyone enjoys the gameplay and the fun environment setup.",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
  },
];

const Testimonials = () => (
  <div className="flex justify-center items-center py-2 mb-16">
    <div className="h-full w-full">
      <h2 className="text-5xl font-semibold text-center tracking-[-0.03em] px-6 text-pretty">
        Success Stories
      </h2>
      <p className="mt-3 text-center text-muted-foreground text-xl">
        Real stories from people who use and love our product every day
      </p>
      <div className="mt-14 relative">
        <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-linear-to-r from-background to-transparent" />
        <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-linear-to-l from-background to-transparent" />
        <Marquee pauseOnHover className="[--duration:25s]">
          <TestimonialList />
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-0 [--duration:25s]">
          <TestimonialList />
        </Marquee>
      </div>
    </div>
  </div>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="#" target="_blank">
            <TwitterLogo className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
    </div>
  ));

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export default Testimonials;
