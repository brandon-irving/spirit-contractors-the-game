import React from 'react'
import InfoCard from '../../core/components/InfoCard'

const CharacterSummary = ({name, spirit, stats, weapon}) => {
    return (
        <InfoCard
        bg="white"
        name={'name'}
        img={'img'}
        badgeTitle="Action Data"
        width='80vw'
        // badgeData={badgeData}
        // actionRow={actionRow}
        // primaryInfo={
        //   <>
        //     {desc}
        //     <Text textAlign={"center"} fontSize="md" fontWeight="bold">
        //       Requirements
        //     </Text>
        //     <Stack direction="row">
        //       {Object.keys(requirements).map((rName, i) => {
        //         return (
        //           <li key={i}>
        //             {rName}: {requirements[rName]}
        //           </li>
        //         );
        //       })}
        //     </Stack>
        //   </>
        // }
      />
    )
}

export default CharacterSummary
