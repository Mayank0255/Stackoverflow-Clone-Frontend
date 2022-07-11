const handleFilters = (sortType, page = '') => {
    let temp = sortType;

    if (page === 'users' && temp === 'Name') {
        temp = 'Username';
    } else if (page === 'users' && temp === 'Popular') {
        temp = 'Popular users';
    }

<<<<<<< HEAD
    let todayDate = Date.now()

    function getTime(a) {
        return new Date(a).getTime()
    }

=======
    const todayDate = Date.now()
    function getTime(a) {
        return new Date(a).getTime()
    }
>>>>>>> origin/burhanraja
    const milliSecSec = 1000
    const milliSecDay = 86300000
    const milliSecWeek = 604800000
    const milliSecMonth = 2628000000
    const milliSecYear = 31540000000

<<<<<<< HEAD
    let handleToday = function (a) {
=======

    let handleToday = function(a) {
>>>>>>> origin/burhanraja
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecDay && aDate > milliSecSec
    }

<<<<<<< HEAD
    let handleWeek = function (a) {
=======
    let handleWeek = function(a) {
>>>>>>> origin/burhanraja
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecWeek
    }

<<<<<<< HEAD
    let handleMonth = function (a) {
=======
    let handleMonth = function(a) {
>>>>>>> origin/burhanraja
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecMonth
    }

<<<<<<< HEAD
    let handleYear = function (a) {
=======
    let handleYear = function(a) {
>>>>>>> origin/burhanraja
        const aDate = todayDate - getTime(a.created_at)
        return aDate < milliSecYear
    }

<<<<<<< HEAD
    switch (temp) {
        case 'Today':
            return (a) => handleToday(a)
=======

    switch (temp) {
        case 'Today':
            return(a) => handleToday(a)
>>>>>>> origin/burhanraja
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

<<<<<<< HEAD
export default handleFilters;
=======
export default handleFilters;
>>>>>>> origin/burhanraja
