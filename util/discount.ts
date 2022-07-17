import { Sconto } from './types'
import { v4 as uuid } from 'uuid'

export function generateDiscountCode(howMany: number): Sconto[] {
    return [...Array(howMany)].map(n => ({
        Codice: uuid(),
        Percentuale: Math.floor((Math.random() * 75) + 1) //1% - 75%
    }))
}