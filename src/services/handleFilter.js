const handleFilter = (sortType, page = '') => {
    let temp = sortType;

    if (page === 'users' && temp === 'Name') {
        temp = 'Username';
    } else if (page === 'users' && temp === 'Popular') {
        temp = 'Popular users';
    }

    let todayDate = Date.now()

    function getTime(a) {
        return new Date(a).getTime()
    }

    const milliSecSec = 1000
    const milliSecDay = 86300000
    const milliSecWeek = 604800000
    const milliSecMonth = 2628000000
    const milliSecYear = 31540000000


    let handleToday = function(a) {
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecDay && aDate > milliSecSec
    }

    let handleWeek = function(a) {
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecWeek
    }

    let handleMonth = function(a) {
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecMonth
    }

    let handleYear = function(a) {
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecYear
    }


    switch (temp) {
        case 'Today':
            return(a) => handleToday(a)
        case 'Week':
            return (a) => handleWeek(a)
        case 'Month':
            return (a) => handleMonth(a)
        case 'Year':
            return (a) => handleYear(a)
        default:
            break;
    }
}

export default handleFilter;
