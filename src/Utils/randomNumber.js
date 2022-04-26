export default function randomNumb (inferior, superior) {
  const numPosibilidades = superior - inferior
  let aleatorio = Math.random() * (numPosibilidades + 1)
  aleatorio = Math.floor(aleatorio)
  return inferior + aleatorio
}
