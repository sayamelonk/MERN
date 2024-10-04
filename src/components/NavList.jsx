import { NavLink } from 'react-router-dom'

const links = [
  { id: 1, url: 'About', text: 'about' },
  { id: 2, url: 'products', text: 'products' },
  { id: 3, url: 'orders', text: 'oders' },
]
const NavList = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link
        return (
          <li key={id}>
            <NavLink className={'capitalize'} to={url}>
              {text}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}

export default NavList
