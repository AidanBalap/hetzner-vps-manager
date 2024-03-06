export default defineEventHandler(async (event) => {

    const data:HSnapshotList = await $fetch('https://api.hetzner.cloud/v1/images?type=snapshot&sort=created:desc', {
        headers: { 'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY }
    })

    return data.images
})