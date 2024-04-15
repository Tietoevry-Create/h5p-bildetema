import React from 'react'
import Select from '../Select/Select'
import styles from './CollectionSelecter.module.scss'
import { useMyCollections } from 'common/hooks/useMyCollections'

const CollectionSelecter = (): React.JSX.Element => {

  const { myCollections } = useMyCollections()

  const options = myCollections.map((collection) => {
    return {
      label: collection.title
    }
  })
  
  return (
    <div className={styles.container}>

    <Select fixed placeholder='Velg samling' variant='secondary' options={options} handleChange={function (option: { label: string; secondaryLabel?: string | undefined }): void {
      throw new Error('Function not implemented.')
    } } selectedOption={{
      label: '',
      secondaryLabel: undefined
    }} />
    </div>
  )
}

export default CollectionSelecter