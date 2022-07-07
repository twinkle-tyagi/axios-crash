

async function f1()
{
    console.log('a');
    console.log('b');

    const promise = await new Promise((res, rej) =>
    {
    setTimeout(()=> {
        res(console.log('c'))}, 2000);
    });

    const promise2 = await new Promise((res, rej) =>
    {
    setTimeout(()=> {
        res(console.log('d'))}, 0);
    });

    console.log('e');
}

f1();






