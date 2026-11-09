import React from 'react';

/**
 * The aurora field that sits behind every glass surface.
 *
 * The glass is only convincing if there is something colourful and moving
 * behind it for backdrop-filter to refract. Fixed, pointer-events-none, and
 * excluded from the accessibility tree.
 */
export const Atmosphere: React.FC = () => (
  <div className="aurora" aria-hidden="true">
    <div className="aurora__blob aurora__blob--cyan" />
    <div className="aurora__blob aurora__blob--violet" />
    <div className="aurora__blob aurora__blob--amber" />
    <div className="aurora__grain" />
  </div>
);

export default Atmosphere;
