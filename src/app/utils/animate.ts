import {
 animate,
 group,
 keyframes,
 query,
 sequence,
 stagger,
 state,
 style,
 transition,
 trigger,
} from "@angular/animations";

// fadeSlideInOut starts here
export const fadeSlideInOut = trigger("fadeSlideInOut", [
 state(
  "out",
  style({
   overflow: "hidden",
   height: "*",
   "padding-top": "*",
   "padding-bottom": "*",
  })
 ),
 state(
  "in",
  style({
   // opacity: "0.4",
   overflow: "hidden",
   height: "0px",
   "padding-top": "0",
   "padding-bottom": "0",
  })
 ),
 transition("in => out", animate("1000ms ease-in-out")),
 transition("out => in", animate("1000ms ease-in-out")),
]);

// slideRightInOut starts here
export const slideRightInOut = trigger("slideRightInOut", [
 state("in", style({ transform: "translateX(-0%)" })),
 transition("void => *", [
  style({ transform: "translateX(100%)" }),
  animate('200ms'),
 ]),
 transition("* => void", [
  animate('200ms', style({ transform: "translateX(100%)" })),
 ]),
]);
// slideRightInOut starts here
export const slideLeftInOut = trigger("slideLeftInOut", [
 state("in", style({ transform: "translateX(-0%)" })),
 transition("void => *", [
  style({ transform: "translateX(-100%)" }),
  animate('200ms'),
 ]),
 transition("* => void", [
  animate('200ms', style({ transform: "translateX(-100%)" })),
 ]),
]);

// zoomInOut starts here
export const zoomInOut = trigger("zoomInOut", [
 state("in", style({ transform: "scale(0.2)" })),
 transition("void => *", [style({ transform: "scale(0.3)" }), animate('1000ms')]),
 transition("* => void", [animate('1000ms', style({ transform: "scale(0)" }))]),
]);

// fade starts here
export const fade = trigger('fade', [
 transition('void => *', [
  style({ opacity: 0 }),
  animate('400ms', style({ opacity: 1 })),
 ]),
 transition("* => void", [
  animate('300ms', style({ opacity: 0 }))
 ])
])

// slideUpDown starts here
export const slideUpDown =
 trigger('slideUpDown', [
  state('in', style({ height: '*', opacity: 0 })),
  transition(':leave', [
   style({ height: '*', opacity: 1 }),
   group([
    animate(400, style({ height: 0 })),
    animate('800ms ease-in-out', style({ 'opacity': '0' }))
   ])
  ]),
  transition(':enter', [
   style({ height: '0', opacity: 0 }),
   group([
    animate(400, style({ height: '*' })),
    animate('800ms ease-in-out', style({ 'opacity': '1' }))
   ])
  ]),
 ])

// flyInOut starts here
export const flyInOut = [
 trigger('flyInOut', [
  state('in', style({ transform: 'translateY(0%)' })),
  transition('void => *', [
   style({ transform: 'translateY(-100%)' }),
   animate(1150)
  ]),
  transition('* => void', [
   animate(1150, style({ transform: 'translateY(100%)' }))
  ])
 ]),

]
// fadeIn starts here
export const fadeIn = trigger('fadeIn', [
 transition('* <=> *', [
  query(':enter',
   [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
   { optional: true }
  ),
  query(':leave',
   animate('200ms', style({ opacity: 0 })),
   { optional: true }
  )
 ])
])

// slideInDown starts here
export const slideInDown =
 trigger('slideInDown', [
  transition(':enter', [
   query('.row', [
    style({ opacity: 0, transform: 'translateY(-100px)' }),
    stagger(200, [
     animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
      style({ opacity: 1, transform: 'none' }))
    ])
   ])
  ])
 ])

// dropdown animation
export const DropDownAnimation = trigger("dropDownMenu", [
 transition(":enter", [
  style({ height: 0, overflow: "hidden" }),
  query(".menu-item", [
   style({ opacity: 0, transform: "translateY(-50px)" })
  ]),
  sequence([
   animate("200ms", style({ height: "*" })),
   query(".menu-item", [
    stagger(-50, [
     animate("400ms ease", style({ opacity: 1, transform: "none" }))
    ])
   ])
  ])
 ]),

 transition(":leave", [
  style({ height: "*", overflow: "hidden" }),
  query(".menu-item", [style({ opacity: 1, transform: "none" })]),
  sequence([
   query(".menu-item", [
    stagger(50, [
     animate(
      "400ms ease",
      style({ opacity: 0, transform: "translateY(-50px)" })
     )
    ])
   ]),
   animate("200ms", style({ height: 0 }))
  ])
 ])
]);