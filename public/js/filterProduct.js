function filterProduct(e){
    window.location.href = '/?category='+e.value;
}
function priceBy(e){
    if(e.value !== undefined){
        window.location.href = '/?'+e.value + "=" + 'true';
    }else{
        window.location.href = '/?'
    }
}