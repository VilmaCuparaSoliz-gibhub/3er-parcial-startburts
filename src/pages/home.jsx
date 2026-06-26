import miau1 from '../assets/img/miau1.png'

function Home() {
  return (
    <>
      <div className="home">
        <h1>BIEMBENIDO A ESTA PAGINA </h1>
        <p>This is the home page of our application.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur commodo. Sed at ligula a nunc efficitur tincidunt. Curabitur ac odio id metus bibendum fermentum.</p>
        <img src={miau1} alt="Placeholder" />
      </div>
    </>
  )
}

export default Home;
