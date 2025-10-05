export const fadeIn = { hidden:{opacity:0}, show:{opacity:1, transition:{duration:0.6, ease:"easeInOut"}} };
export const slideUp = { hidden:{y:40, opacity:0}, show:{y:0, opacity:1, transition:{duration:0.6, ease:"easeOut"}} };
export const staggerContainer = { hidden:{}, show:{ transition:{ staggerChildren:0.12 } } };
