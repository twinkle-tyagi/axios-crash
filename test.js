

const pr = async() =>
{

    try{
        const promise = await new Promise((res, rej) => {
            setTimeout(() => {
               res(console.log('buy car'));
            },2000);
        });

        //console.log(promise);

        console.log('plan for goa trip');
    }
    catch(err)
    {
        console.log(err);
    }
}

pr();
/*
const promise = new Promise((resolve, reject) => 
{
setTimeout(() => {
    resolve(console.log('buy car'))
},2000);
});
*/
/*
function p2()
{
    console.log("plan to Goa");
}
*/