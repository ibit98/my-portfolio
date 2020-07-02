import { animated } from 'react-spring'
import styled from 'styled-components'

const Container = styled(animated.div)`
  // position: relative;
  // display: grid;
  // grid-template-columns: repeat(4, minmax(100px, 1fr));
  // grid-gap: 15px;
  display: flex;
  max-width: 80vw;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
  background: 'white';
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;
`

const Item = styled(animated.div)`
  width: 20rem;
  max-width: 42%;
  height: 12em;
  padding: .5em;
  border-radius: 5px;
  will-change: transform, opacity;
`

export { Container, Item }
