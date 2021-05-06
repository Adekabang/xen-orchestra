import React from 'react'
import styled from 'styled-components'
import { Map } from 'immutable'
import { withState } from 'reaclette'

import { Network, ObjectsByType, Pif } from '../../libs/xapi'
import { FormattedMessage } from 'react-intl'

interface ParentState {
  objectsByType: ObjectsByType
}

interface State {}

interface Props {
  poolId: string
}

interface ParentEffects {}

interface Effects {}

interface Computed {
  networks?: Map<string, Network>
  objectsFetched: boolean
  PIFs?: Map<string, Pif>
}

const Table = styled.table`
  border: 1px solid #333;
  td  {
    border: 1px solid #333;
  }
  thead {
    background-color: #333;
    color: #fff;
  }
`

const PoolNetwork = withState<State, Props, Effects, Computed, ParentState, ParentEffects>(
  {
    computed: {
      networks: (state, props) =>
        state.objectsFetched
          ? state.objectsByType.get('network')?.filter(network => network.$pool.$id === props.poolId)
          : undefined,
      objectsFetched: state => state.objectsByType !== undefined,
      PIFs: state =>
        state.objectsByType.get('PIF')?.filter(pif => state.networks?.find(network => network.$ref === pif.network)),
    },
  },
  ({ state }) => (
    <Table>
      <thead>
        <tr>
          <td>
            <FormattedMessage id='device' />
          </td>
          <td>
            <FormattedMessage id='DNS' />
          </td>
          <td>
            <FormattedMessage id='gateway' />
          </td>
          <td>
            <FormattedMessage id='IP' />
          </td>
        </tr>
      </thead>
      <tbody>
        {state.PIFs?.valueSeq().map(
          pif =>
            pif.management && (
              <tr key={pif.$id}>
                <td>{pif.device}</td>
                <td>{pif.DNS}</td>
                <td>{pif.gateway}</td>
                <td>{pif.IP}</td>
              </tr>
            )
        )}
      </tbody>
    </Table>
  )
)

export default PoolNetwork