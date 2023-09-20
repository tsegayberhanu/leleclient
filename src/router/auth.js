
import signup from "../components/textinputs/sign-up"
import confirmemail from '../components/textinputs/confirmemail'
import resendconfirmation from '../components/textinputs/resendconfirmation'
import sendconfirmationlink from '../components/textinputs/RECfromsignup'
import signin from "../components/textinputs/sign-in"
import forgotpassword from '../components/textinputs/forgotpassword'
import resetpassword from '../components/textinputs/resetpassword'

const  auth = [

    {
        path: '/auth/signup',
        name: 'signup',
        component: signup
    },

    {
        path: '/auth/confirmemail',
        name: 'confirmemail',
        component: confirmemail
    },
    {
        path: '/auth/sendconfirmationlink',
        name: 'sendconfirmationlink',
        component: sendconfirmationlink,
        props: true
    },
    
    {
        path: '/auth/resendconfirmation',
        name: 'resendconfirmation',
        component: resendconfirmation
    },

    {
        path: '/auth/signin',
        name: 'signin',
        component: signin
    },

    {
        path: '/auth/forgotpassword',
        name: 'forgotpassword',
        component: forgotpassword
    }
    ,
    {
        path: '/auth/resetpassword',
        name: 'resetpassword',
        component: resetpassword
    }
    ,
]

export default auth