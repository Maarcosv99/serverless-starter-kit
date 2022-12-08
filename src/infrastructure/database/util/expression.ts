interface MountedExpression {
    UpdateExpression: string,
    ExpressionAttributeNames: Record<string, string>,
    ExpressionAttributeValues: Record<string, any>
}

export function mountExpression(payload: Record<string, any>): MountedExpression {
    const itemKeys = Object.keys(payload)

    let params = {
        UpdateExpression: 'SET',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    }

    itemKeys.forEach((key: string) => {
        if (key === 'SK' || key === 'PK') return;
        if (!payload[key]) return;
        const keyVar = key.toLowerCase()
        params.UpdateExpression += ` #${keyVar} = :${keyVar},`
        params.ExpressionAttributeNames[`#${keyVar}`] = key
        params.ExpressionAttributeValues[`:${keyVar}`] = payload[key]
    })

    // Remove the last comma.
    params.UpdateExpression = params.UpdateExpression.slice(0, -1)

    return params
}
