import React from 'react'
import EditContainer from './components/EditContainer';
import EditFormContainer from './components/EditFormContainer';

export default async function ProductEdit({ params }: { params: { id: string } }) {
    const { id } = await params
    return (
        <div>
            <EditContainer>
                <EditFormContainer id={id}/>
            </EditContainer>
        </div>
    )
}
