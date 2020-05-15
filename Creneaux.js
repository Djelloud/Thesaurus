// Creneaux.js

function creerObj3DCreneaux(objgl, obj3DMurs, intNoTexture) {
    const obj3DCreneaux = new Object();
    obj3DCreneaux.fltProfondeur = obj3DMurs.fltProfondeur;
    obj3DCreneaux.fltLargeur = obj3DMurs.fltLargeur;
    obj3DCreneaux.fltHauteur = 0.5;

    obj3DCreneaux.vertex = creerVertexCreneaux(objgl, obj3DCreneaux.fltLargeur, obj3DCreneaux.fltProfondeur, obj3DCreneaux.fltHauteur);
    obj3DCreneaux.couleurs = creerCouleursCreneaux(objgl, obj3DCreneaux.fltLargeur, obj3DCreneaux.fltProfondeur, [1, 1, 1, 1]);
    obj3DCreneaux.texels = creerTexelsCreneaux(objgl, obj3DCreneaux.fltLargeur, obj3DCreneaux.fltProfondeur, obj3DCreneaux.fltHauteur, intNoTexture);
    obj3DCreneaux.maillage = creerMaillageCreneaux(objgl, obj3DCreneaux.fltLargeur, obj3DCreneaux.fltProfondeur);

    obj3DCreneaux.transformations = creerTransformations();
    setPositionY(obj3DMurs.fltHauteur, obj3DCreneaux.transformations);

    return obj3DCreneaux;
}

function creerVertexCreneaux(objgl, fltLargeur, fltProfondeur, fltHauteur) {

    let tabVertex = [];
    for (let i = 0; i < fltLargeur; i++)
        tabVertex = tabVertex.concat(
            [  // Créneaux du mur nord
                -fltLargeur / 2 + i, fltHauteur, -fltProfondeur / 2,
                -fltLargeur / 2 + i + 0.5, fltHauteur, -fltProfondeur / 2,
                -fltLargeur / 2 + i, 0, -fltProfondeur / 2,
                -fltLargeur / 2 + i + 0.5, 0, -fltProfondeur / 2,
                // Créneaux du mur sud
                fltLargeur / 2 - i, fltHauteur, fltProfondeur / 2,
                fltLargeur / 2 - i - 0.5, fltHauteur, fltProfondeur / 2,
                fltLargeur / 2 - i, 0, fltProfondeur / 2,
                fltLargeur / 2 - i - 0.5, 0, fltProfondeur / 2
            ]);

    for (let i = 0; i < fltProfondeur; i++)
        tabVertex = tabVertex.concat(
            [  // Créneaux du mur est
                fltLargeur / 2, fltHauteur, -fltProfondeur / 2 + i,
                fltLargeur / 2, fltHauteur, -fltProfondeur / 2 + i + 0.5,
                fltLargeur / 2, 0, -fltProfondeur / 2 + i,
                fltLargeur / 2, 0, -fltProfondeur / 2 + i + 0.5,
                // Créneaux du mur ouest
                -fltLargeur / 2, fltHauteur, fltProfondeur / 2 - i,
                -fltLargeur / 2, fltHauteur, fltProfondeur / 2 - i - 0.5,
                -fltLargeur / 2, 0, fltProfondeur / 2 - i,
                -fltLargeur / 2, 0, fltProfondeur / 2 - i - 0.5
            ]);

    const objCreneaux = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCreneaux);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objCreneaux;
}

function creerCouleursCreneaux(objgl, fltLargeur, fltProfondeur, tabCouleur) {
    let tabCouleurs = [];
    for (let i = 0; i < (fltLargeur + fltProfondeur) * 8; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursCreneaux = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCreneaux);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursCreneaux;
}

function creerTexelsCreneaux(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {

    let tabTexels = [];
    for (let i = 0; i < (fltLargeur + fltProfondeur) * 2; i++)
        tabTexels = tabTexels.concat(
            [0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0
            ]);

    const objTexelsCreneaux = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCreneaux);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsCreneaux.intNoTexture = intNoTexture; objTexelsCreneaux.pcCouleurTexel = 1.0;

    return objTexelsCreneaux;
}

function creerMaillageCreneaux(objgl, fltLargeur, fltProfondeur) {
    let tabMaillage = [];
    for (let i = 0; i < (fltLargeur + fltProfondeur) * 2; i++)
        tabMaillage = tabMaillage.concat(
            [i * 4 + 0, i * 4 + 1, i * 4 + 2,
            i * 4 + 1, i * 4 + 2, i * 4 + 3
            ]);

    const objMaillageCreneaux = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCreneaux);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageCreneaux.intNbTriangles = (fltLargeur + fltProfondeur) * 4;
    // Le nombre de droites
    objMaillageCreneaux.intNbDroites = 0;

    return objMaillageCreneaux;
}


