import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import Mail from './views/Mail.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteAdd from './apps/keep/pages/NoteAdd.js'
import BookIndex from "./apps/book/pages/BookIndex.js"
import BookDetails from "./apps/book/pages/BookDetails.js"
import BookEdit from "./apps/book/pages/BookEdit.js"
import BookAdd from "./apps/book/pages/BookAdd.js"
// import MailIndex from './apps/mail/pages/mail-index.js'
// import MailDetails from './apps/mail/pages/mail-details.js'
// import MailCompose from './apps/mail/pages/mail-compose.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/mail',
			component: Mail,
		},
		{
			path: '/note',
			component: NoteIndex,
		},
		{
			path: '/note/add',
			component: NoteAdd,
		},
		{
            path: '/book',
            component: BookIndex,//to add
        },
        {
            path: '/book/:bookId',
            component: BookDetails,//to add
        },
        {
            path: '/book/edit/:bookId?',
            component: BookEdit,//to add
        },
        {
            path: '/book/add',
            component: BookAdd,//to add
        },
        {
            path: '/:catchAll(.*)',
            component: AboutUs
        }
		// {
		// 	path: 'mail/index',
		// 	component: MailIndex
		// },
		// {
		// 	path: 'mail/details',
		// 	component: MailDetails,
		// },
		// {
		// 	path: 'mail/compose',
		// 	component: MailCompose
		// },

	],
}

export const router = createRouter(routerOptions)
