export const getStartAndEndOfCurrentWeek = () => {
    const now = new Date();
  
    const dayOfWeek = now.getUTCDay();
  
    // Set to midnight UTC for consistency
    const startOfWeek = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - dayOfWeek
    ));
  
    const endOfWeek = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + (6 - dayOfWeek),
      23, 59, 59, 999
    ));
  
    return { startOfWeek,now, endOfWeek };
  };
  