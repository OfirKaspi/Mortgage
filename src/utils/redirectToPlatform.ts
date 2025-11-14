export const redirectToPlatform = (url: string, wasDragged?: boolean) => {
    if (wasDragged) return;
  
    // This function is only called on mobile devices
    // On mobile, use location.href to allow native app deep linking
    // This enables WhatsApp, Facebook, Instagram, Waze apps to open if installed
    window.location.href = url;
  };
  