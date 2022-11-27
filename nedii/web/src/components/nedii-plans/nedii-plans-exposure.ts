export const NediiPlanExposure = ( exposure: string ): string => {
  let exposureParsed = '';
  switch ( exposure ) {
    case 'basic':
      exposureParsed = 'basica';
      break;
    case 'medium':
      exposureParsed = 'media';
      break;
    case 'high':
      exposureParsed = 'alta';
      break;
    case 'full':
      exposureParsed = 'maxima';
      break;
    default:
      break;
  }
  return exposureParsed;
};
