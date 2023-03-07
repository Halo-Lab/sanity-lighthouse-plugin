export const COLORS = ['#0cce6a', '#ffa400', '#ff4e43']
export const COLORS_BG = ['rgb(255,51,51)', 'rgb(0,204,102)', 'rgb(255,170,51)']
export const STATE_TYPE = {idle: 'idle', loading: 'loading', success: 'success', error: 'error'}
export const LIST_DEVICES = {mobile: 'mobile', desktop: 'desktop'}
export const METRICS_LIST = [
  'CUMULATIVE_LAYOUT_SHIFT_SCORE',
  'EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT',
  'EXPERIMENTAL_TIME_TO_FIRST_BYTE',
  'FIRST_CONTENTFUL_PAINT_MS',
  'FIRST_INPUT_DELAY_MS',
  'LARGEST_CONTENTFUL_PAINT_MS',
]
export const METRICS_TITLE_LIST = [
  'Cumulative Layout Shift (CLS)',
  'Interaction to Next Paint (INP)',
  'Time to First Byte (TTFB)',
  'First Contentful Paint (FCP)',
  'First Input Delay (FID)',
  'Largest Contentful Paint (LCP)',
]

export const METRICS_DESCRIPTION_LIST = [
  [
    {
      title: 'What is CLS?',
      text: 'CLS is a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.A layout shift occurs any time a visible element changes its position from one rendered frame to the next. (See below for details on how individual layout shift scores are calculated.)A burst of layout shifts, known as a session window, is when one or more individual layout shifts occur in rapid succession with less than 1-second in between each shift and a maximum of 5 seconds for the total window duration.The largest burst is the session window with the maximum cumulative score of all layout shifts within that window.',
      link: '',
    },
    {
      title: 'What is a good CLS score?',
      text: "To provide a good user experience, sites should strive to have a CLS score of 0.1 or less. To ensure you're hitting this target for most of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.",
      link: 'https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/9mWVASbWDLzdBUpVcjE1.svg',
    },
  ],
  [
    {
      title: 'What is INP?',
      text: "INP aims to represent a page's overall responsiveness by measuring all click, tap, and keyboard interactions made with a page. The longest of those observed interactions—with some exceptions noted below—is chosen as the page's INP value when the user is done with the page.",
      link: '',
    },
    {
      title: 'What is a good INP score??',
      text: "Pinning labels such as 'good' or 'poor' on a responsiveness metric is difficult. On one hand, you want to encourage development practices that prioritize good responsiveness. On the other hand, you must account for the fact that there's considerable variability in the capabilities of devices people use to set achievable development expectations.To ensure you're delivering user experiences with good responsiveness, a good threshold to measure is the 75th percentile of page loads recorded in the field, segmented across mobile and desktop devices:An INP below or at 200 milliseconds means that your page has good responsiveness.An INP above 200 milliseconds and below or at 500 milliseconds means that your page's responsiveness needs improvement.An INP above 500 milliseconds means that your page has poor responsiveness.",
      link: '',
    },
  ],
  [
    {
      title: 'What is TTFB?',
      text: 'TTFB is a metric that measures the time between the request for a resource and when the first byte of a response begins to arrive. TTFB is the sum of the following request phases:Redirect time Service worker startup time (if applicable) DNS lookup Connection and TLS negotiation Request, up until the point at which the first byte of the response has arrivedReducing latency in connection setup time and on the backend will contribute to a lower TTFB.',
      link: '',
    },
    {
      title: 'What is a good TTFB score?',
      text: "Because TTFB precedes user-centric metrics such as First Contentful Paint (FCP) and Largest Contentful Paint (LCP), it's recommended that your server responds to navigation requests quickly enough so that the 75th percentile of users experience an FCP within the 'good' threshold. As a rough guide, most sites should strive to have Time To First Byte of 0.8 seconds or less.",
      link: 'https://web-dev.imgix.net/image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/ILJ1xKjzVisqOPPyHYVA.svg',
    },
  ],
  [
    {
      title: 'What is FCP?',
      text: 'The First Contentful Paint (FCP) metric measures the time from when the page starts loading to when any part of the page\'s content is rendered on the screen. For this metric, "content" refers to text, images (including background images), <svg> elements, or non-white <canvas> elements.',
      link: '',
    },
    {
      title: 'What is a good FCP score?',
      text: "To provide a good user experience, sites should strive to have a First Contentful Paint of 1.8 seconds or less. To ensure you're hitting this target for most of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.",
      link: 'https://web-dev.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/V1mtKJenViYAhn05WxqR.svg',
    },
  ],
  [
    {
      title: 'What is FID?',
      text: 'FID measures the time from when a user first interacts with a page (that is, when they click a link, tap on a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to begin processing event handlers in response to that interaction.',
      link: '',
    },
    {
      title: 'What is a good FID score?',
      text: "To provide a good user experience, sites should strive to have a First Input Delay of 100 milliseconds or less. To ensure you're hitting this target for most of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.",
      link: 'https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/eXyvkqRHQZ5iG38Axh1Z.svg',
    },
  ],
  [
    {
      title: 'What is LCP?',
      text: 'The Largest Contentful Paint (LCP) metric reports the render time of the largest image or text block visible within the viewport, relative to when the page first started loading.',
      link: '',
    },
    {
      title: 'What is a good LCP score?',
      text: "To provide a good user experience, sites should strive to have Largest Contentful Paint of 2.5 seconds or less. To ensure you're hitting this target for most of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.",
      link: 'https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/elqsdYqQEefWJbUM2qMO.svg',
    },
  ],
]

export const METRICS_LINK_LIST = [
  'https://web.dev/cls/',
  'https://web.dev/inp/',
  'https://web.dev/ttfb/',
  'https://web.dev/fcp/',
  'https://web.dev/fid/',
  'https://web.dev/lcp/',
]
