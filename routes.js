import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import Mail from './views/Mail.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteAdd from './apps/keep/pages/NoteAdd.js'

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
		}
	],
}

export const router = createRouter(routerOptions)
