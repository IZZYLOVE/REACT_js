import './footer.css'

const Footer = () => {

    let DATE = new Date()
    let YY = DATE.getFullYear()

    return (
        <footer>
<div>&copy;&nbsp;SHOPADDY&nbsp;{YY} </div>
        </footer>
    )
}
export default Footer