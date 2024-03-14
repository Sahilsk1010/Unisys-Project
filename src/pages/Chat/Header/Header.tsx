import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import './Header.scss'
import { RootState } from '../../../store/index'
import { useDispatch } from 'react-redux'
import { clearChat } from '../../../store/user/userSlice'
import ThemeToggle from '../../../components/ThemeToggle'

function Header() {
    const { name } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    return (
        <div className='header'>
            <h1 className='header-title'>Surgeon's Eye</h1> {/* Heading added here */}
           
            <div className='header-buttons'>
                {/* <Icon className='github-icon' icon='mdi:github' height={28} onClick={openGithub} /> */}
                <Icon className='clear-icon' icon='mdi:trashcan-outline' height={28} onClick={() => dispatch(clearChat())} />
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Header
