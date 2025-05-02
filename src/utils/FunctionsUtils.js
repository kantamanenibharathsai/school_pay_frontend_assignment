export const  extractDate = (isoTimestamp) => {
    if (!isoTimestamp || typeof isoTimestamp !== 'string') {
      return ''; 
    }
    const dateObject = new Date(isoTimestamp);
    return dateObject.toISOString().substring(0, 10);
  }


  export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
