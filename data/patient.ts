import { db } from "@/lib/db"

export const getPatientData = async () => {
    const res = await db.patient.findMany({})
    return res
}

export const getPatientDetailData = async (patientId: string) => {
    const res = await db.patient.findUnique({
        where: {
            id: patientId
        }
    })
    return res

}