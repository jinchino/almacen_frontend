//Modulo Angular
var app = angular.module('appIndex', ['ngResource', 'LocalStorageModule']);

//Generalizar url
var urlBack = getURL("http","localhost",8080);
var urlFront = getURL("http","localhost",80);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('Almacen');
});

//Controlador del registro
app.controller('RegistroController', function($scope, $http, $resource) {

	$scope.registrarse = function() {
			var url = urlBack+"registrar/Usuario/" + $scope.usuario.nombre + "/" + $scope.usuario.apellido + "/" + $scope.usuario.codigo + "/" + $scope.usuario.correo + "/" + $scope.usuario.contrasena + "/Estudiante/activo";
      $http.defaults.useXDomain = true;
			$http({
	        method: 'GET',
	        url: url
	      })
				.then(function success(respuesta) {
								if(respuesta.data.value.length > 0){
									window.alert("usuario registrado");
									//window.location.href = "http://almacen_backend-orejuelajd.c9users.io/views/login.html";
								}else{
									window.alert("Error al registrar el usuario");
								}
				 			}, function error(err) {
				 				window.alert('error');
			});
  }
});

app.controller('LoginController', function($scope, $http, $resource, localStorageService) {
	$scope.login = function() {
		var url = urlBack+"login/Usuario/" + $scope.usuario.codigo + "/" + $scope.usuario.contrasena;
		$http.defaults.useXDomain = true;
		$http({
        method: 'GET',
        url: url,
      })
			.then(function success(respuesta) {
				if(respuesta.data.value.length > 0){
					console.log("Login exitoso");
					localStorageService.set("codigo", $scope.usuario.codigo);
					window.location.href = "/usuario.html?cod="+$scope.usuario.codigo;
		                if(respuesta.data.value[0].rol == "Estudiante"){
		                  	localStorageService.set("codigo", $scope.usuario.codigo);
		  					window.location.href = urlFront+"views/perfilEstudiante.html?codigo="+$scope.usuario.codigo;
		                }
		                if(respuesta.data.value[0].rol == "Almacenista"){
		                  	localStorageService.set("codigo", $scope.usuario.codigo);
		  					window.location.href = urlFront+"views/perfilAlmacenistaPrestamo.html?codigo="+$scope.usuario.codigo;
		                }
		                if(respuesta.data.value[0].rol == "Funcionario"){
		                  	localStorageService.set("codigo", $scope.usuario.codigo);
		  					window.location.href = urlFront+"views/Funcionarioperfil.html?codigo="+$scope.usuario.codigo;
		                }
				}else{
								window.alert("Login erroneo");
							}
			}, function error(err) {
				window.alert('error');
			});
  }
});

//Funcion para devolver la URL general
function getURL(protocol, host, port){
	return protocol + '://' + host + ':' + port + '/';
}


