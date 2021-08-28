import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import InfoCard from '../../core/components/InfoCard'
const Info = ({title, descs})=> <Stack mt={3}>
<Text mb={-2} fontWeight='bold' fontSize='xl'> {title}: </Text>
{descs.map((desc, i)=><Text key={i}> {desc} </Text>)}

</Stack>
const CharacterSummary = ({character: {name, spirit, stats, weapon}}) => {
    
  return (
        <InfoCard
        bg="white"
        name={name}
        img={'img'}
        width='80vw'
        primaryInfo={
          <>
          <Info title='Spirit' descs={[spirit.name]} />
          <Info title='Weapon' descs={[weapon]} />
          <Info title='Stats' descs={Object.keys(stats).map(s=>`${s}: ${stats[s]}`)} />
          </>
        }
      />
    )
}

export default CharacterSummary
