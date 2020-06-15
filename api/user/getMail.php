<?php 
require_once __DIR__."/../config/configUser.php";

if(!empty(isset($_GET['email']))) {
    $user = new User('');
    $response = $user->checkedEmail($_GET['email']);
    if($response) {
        mail($_GET['email'], "Changement de mot de passe, ManGroup",
        'Afin de modifier votre mot de passe, merci de cliquer sur le lien ci-dessous:
        https://www.ameddas.ovh/#/auth/'.$_GET['email'].'/newPassword');
        $json = json_encode(true);
        echo $json;
        return $json;
    } else {
        $json = json_encode(false);
        echo $json;
        return $json;
    }
} else {
    $json = json_encode(false);
    echo $json;
    return $json;
}
