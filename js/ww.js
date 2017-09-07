var i = 0;

function contador() {
	i = i + 1;
	// console.log("storeTmp", storeTmp);
	/* tiendas guardadas temporalmente, se borran a los 21 segundos de ser registrada */
	$.each(storeTmp, function(index, val) {
		// console.log("storeTmp[index].time", storeTmp[index].time);
		storeTmp[index].time = storeTmp[index].time - 1;
		if (storeTmp[index].time == 0) {
			storeTmp.splice(0,index+1); // tienda eliminada de temporales
			return false;
		}
	});

	/* Categorias guardadas temporalmente, se borran a los 10 minutos de ser registrada */
	$.each(categorie_temporal, function(index, val) {
		if (categorie_temporal[index] != 0) {
			categorie_temporal[index]._time = categorie_temporal[index]._time - 1;
			if (categorie_temporal[index]._time == 0) {
				categorie_temporal.splice(0,index+1); // categoria eliminada de temporales
				return false;
			}
		}
	});

	setTimeout("contador()", 3000);
}
contador();