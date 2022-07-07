const handleFilters = (sortType, page = '') => {
    let temp = sortType;

    if (page === 'users' && temp === 'Name') {
        temp = 'Username';
    } else if (page === 'users' && temp === 'Popular') {
        temp = 'Popular users';
    }

    let handleToday = function(a) {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        return aDate < 86300000 && aDate > 1000
    }

    let handleWeek = function(a) {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        return aDate < 604800000
    }

    let handleMonth = function(a) {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        return aDate < 2628000000
    }

    let handleYear = function(a) {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        return aDate < 31540000000
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

export default handleFilters;
