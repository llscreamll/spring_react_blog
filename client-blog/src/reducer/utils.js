
export let updateLikeCountUtils  = (id,login,stateBlogs) =>{
   return stateBlogs.map(el => {
        if (el.id === id) {
            if (el.likeUser.indexOf(login) === -1) {
                return {
                    ...el,
                    likeCount: el.likeCount + 1,
                    likeUser: [login]
                }
            } else {
                return {
                    ...el,
                    likeCount: el.likeCount - 1,
                    likeUser: el.likeUser.filter(el => el !== login)
                }
            }
        } else {
            return el;
        }
    })
}