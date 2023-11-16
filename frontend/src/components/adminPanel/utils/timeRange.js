export const getTimeRange = (timeRange) => {
    const currentDate = new Date();
    let startTime, endTime;
  
    switch (timeRange) {
      case 'a minute ago':
        startTime = currentDate.getTime() - 60 * 1000; // 60 seconds * 1000 milliseconds
        endTime = currentDate.getTime();
        break;
  
      case 'an hour ago':
        startTime = currentDate.getTime() - 60 * 60 * 1000; // 60 minutes * 60 seconds * 1000 milliseconds
        endTime = currentDate.getTime();
        break;
  
      case 'today':
        startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
        endTime = currentDate.getTime();
        break;
  
      case 'yesterday':
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        startTime = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).getTime();
        endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1, 23, 59, 59, 999).getTime();
        break;
  
      case 'this week':
        startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()).getTime();
        endTime = currentDate.getTime();
        break;
  
      case 'last week':
        const lastWeekStart = new Date(currentDate);
        lastWeekStart.setDate(currentDate.getDate() - 7 - currentDate.getDay());
        startTime = new Date(lastWeekStart.getFullYear(), lastWeekStart.getMonth(), lastWeekStart.getDate()).getTime();
        endTime = new Date(lastWeekStart.getFullYear(), lastWeekStart.getMonth(), lastWeekStart.getDate() + 6, 23, 59, 59, 999).getTime();
        break;
  
      case 'this month':
        startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
        endTime = currentDate.getTime();
        break;
  
      case 'last month':
        const lastMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        startTime = lastMonthStart.getTime();
        endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0, 23, 59, 59, 999).getTime();
        break;
  
      case 'this year':
        startTime = new Date(currentDate.getFullYear(), 0, 1).getTime();
        endTime = currentDate.getTime();
        break;
  
      case 'last year':
        startTime = new Date(currentDate.getFullYear() - 1, 0, 1).getTime();
        endTime = new Date(currentDate.getFullYear(), 0, 0, 23, 59, 59, 999).getTime();
        break;
  
      default:
        throw new Error('Invalid time range');
    }
  
    return { startTime, endTime };
  };
  