const API = 'https://api.github.com/users/'

const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const userNotFound = document.querySelector('.userNotFound')

const firstOutput = document.querySelector('.first__output')
const secondOutput = document.querySelector('.second__output')

secondOutput.style = `
    display:flex;
    flex-wrap: wrap;
`


const getUser = async () => {
    const req = await fetch(API + input.value, {
        headers: {
            'Authorization': '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',
        },
        method: 'GET',
    })
    const res = await req.json()
    if (res.message == 'Not Found') {
        userNotFound.textContent='User not found'
        userNotFound.style=`
        color:white;
        text-align:center;
        `
    } else {
        userNotFound.textContent=``
        renderUser(res)
        console.log(res)
    }

}

const getRepos = async () => {
    const req = await fetch(API + input.value + '/repos', {
        headers: {
            'Authorization': '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',
        },
        method: 'GET',
    })
    const resRepos = await req.json()
    secondOutput.innerHTML = ''
    renderRepos(resRepos)
}



btn.addEventListener('click', () => {

    firstOutput.innerHTML = ''
    firstBox.innerHTML = ''
    secondOutput.innerHTML = ''
    followBox.innerHTML = ''

    getUser()
    getRepos()
})


const getFollowing = async (login) => {
    const req = await fetch(API + login + '/following', {
        headers: {
            'Authorization': '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',
        },
        method: 'GET',
    })
    const resFollowing = await req.json()

    if (resFollowing.length != 0) {
        renderFollowing(resFollowing)
    } else {
        followBox.innerHTML = ''
        const following = document.createElement('h2')
        following.textContent = 'No following'
        followBox.append(following)
    }
    // console.log(resFollowing)
}

const getFollowers = async (login) => {
    const req = await fetch(API + login + '/followers', {
        headers: {
            'Authorization': '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',
        },
        method: 'GET',
    })
    const resFollowers = await req.json()

    console.log(resFollowers)
    if (resFollowers.length != 0) {
        renderFollowers(resFollowers)
    } else {
        followBox.innerHTML = ''
        const follower = document.createElement('h2')
        follower.textContent = 'No followers'
        followBox.append(follower)
    }

    // console.log(resFollowers)
}





const firstBox = document.createElement('div')
firstBox.className = 'first__box'

const followBox = document.createElement('div')
followBox.className = 'follow__box'


const renderUser = (data) => {

    const profileMain = document.createElement('div')
    profileMain.className = 'profile__main'

    const img = document.createElement('img')
    img.className = 'profile__img'

    const profileInfo = document.createElement('div')
    profileInfo.className = 'profile__info'

    const title = document.createElement('h1')
    title.className = 'profile__title'

    const login = document.createElement('h3')
    login.className = 'profile__login'

    const follow = document.createElement('div')
    follow.className = 'profile__follow'

    const followers = document.createElement('p')
    followers.className = 'profile__follow-followers'
    const following = document.createElement('p')
    following.className = 'profile__follow-following'

    img.src = data.avatar_url
    title.textContent = data.name
    login.textContent = data.login

    followers.textContent = 'show followers'
    following.textContent = 'show following'



    followers.addEventListener('click', () => getFollowers(data.login))
    following.addEventListener('click', () => getFollowing(data.login))

    follow.append(followers, following)
    profileInfo.append(title, login)
    profileMain.append(img, profileInfo)
    firstBox.append(profileMain, follow)

    firstOutput.append(firstBox, followBox)

}


const renderFollowers = (followers) => {
    followBox.innerHTML = ''
    const text = document.createElement('h2')
    text.textContent = 'Followers:'
    followBox.append(text)
    followers.map(el => {
        const follower = document.createElement('a')
        follower.className = 'follow__follower'
        follower.target = '_blank'
        follower.textContent = el.login
        follower.href = el.html_url

        followBox.append(follower)
    })
    console.log(followBox)
}

const renderFollowing = (following) => {
    followBox.innerHTML = ''
    const text = document.createElement('h2')
    text.textContent = 'Following:'
    followBox.append(text)
    following.map(el => {
        const followin = document.createElement('a')
        followin.className = 'followBox__followin'
        followin.target = '_blank'
        followin.textContent = el.login
        followin.href = el.html_url

        followBox.append(followin)
    })
}


const renderRepos = (repos) => {
    repos.map(el => {
        const col = document.createElement('div')
        col.className = 'col-6'


        const box = document.createElement('div')
        box.className = 'repos__box'

        const name = document.createElement('a')
        name.textContent = el.name
        name.target = '_blank'
        name.className = 'repos__name'
        name.href = el.clone_url

        const descr = document.createElement('p')
        if (typeof (el.descr) != null) {
            descr.textContent = el.descr
        } else {
            descr.textContent = 'No description'
        }


        const language = document.createElement('p')
        language.className = 'repos__language'

        if (el.language != null) {
            language.textContent = el.language
        } else {
            language.textContent = 'No information'
        }


        box.append(name, descr, language)
        col.append(box)
        secondOutput.append(col)
    })
}
