var hidden = isHidden(document.getElementById('zoom-viewer'));
function CardHasId(data, id)
{
    if (id === data.id)
        return true;
    const betaId = (data.misc_info && data.misc_info[0] && data.misc_info[0].beta_id);
    if (betaId && (id === betaId))
        return true;

    return false;
}

function UpdateZoomDataModal(data) {
  const modalTargetId = document.getElementById('modal-viewer').zoomedCardId;

  if (!CardHasId(data, modalTargetId))
    return;

  if (!data.status)
  {
    document.getElementById('modal-viewer').classList.add('bad');
    document.getElementById('modal-zoom-name').innerText = 'API failed';
    document.getElementById('modal-zoom-text').innerText = ('Failed to get card data:\n-'+data.message);
    return;
  }

  document.getElementById('modal-zoom-name').innerText = data.name;
  document.getElementById('modal-zoom-text').innerText = data.desc;

  if (data.misc_info && data.misc_info[0] && !data.misc_info[0].has_effect) {
    document.getElementById('modal-zoom-text').style.fontStyle = 'italic';
  }

  if (data.id !== modalTargetId)
  {
    const modalPediaBtn = document.getElementById('modal-zoom-yugipedia');

    modalPediaBtn.href = ('https://yugipedia.com/wiki/' + ('0000000'+data.id).slice(-8));
    modalPediaBtn.style.visibility = '';
  }

  var konamiId = (data.misc_info && data.misc_info[0] && data.misc_info[0].konami_id);
  if (konamiId)
  {
    var modalKdbBtn = document.getElementById('modal-zoom-konamidb');
    modalKdbBtn.href = 'https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=' + konamiId;
    modalKdbBtn.style.visibility = '';

    var modalYgorgBtn = document.getElementById('modal-zoom-ygorgdb');
    modalYgorgBtn.href = 'https://db.ygorganization.com/card#' + konamiId;
    modalYgorgBtn.style.visibility = '';
  }
}

function UpdateZoomData(data)
{
  const targetId = document.getElementById('zoom-viewer').zoomedCardId;

  if (!CardHasId(data, targetId))
    return;

  if (!data.status)
  {
    document.getElementById('zoom-viewer').classList.add('bad');
    document.getElementById('zoom-name').innerText = 'API failed';
    document.getElementById('zoom-text').innerText = ('Failed to get card data:\n-'+data.message);
    return;
  }

  document.getElementById('zoom-name').innerText = data.name;
  document.getElementById('zoom-text').innerText = data.desc;

  if (data.misc_info && data.misc_info[0] && !data.misc_info[0].has_effect) {
    document.getElementById('zoom-text').style.fontStyle = 'italic';
  }

  if (data.id !== targetId)
  {
    const pediaBtn = document.getElementById('zoom-yugipedia');

    pediaBtn.href = ('https://yugipedia.com/wiki/' + ('0000000'+data.id).slice(-8));
    pediaBtn.style.visibility = '';
  }


  var konamiId = (data.misc_info && data.misc_info[0] && data.misc_info[0].konami_id);
  if (konamiId)
  {
      var kdbBtn = document.getElementById('zoom-konamidb');
      kdbBtn.href = 'https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=' + konamiId;
      kdbBtn.style.visibility = '';

      var ygorgBtn = document.getElementById('zoom-ygorgdb');
      ygorgBtn.href = 'https://db.ygorganization.com/card#' + konamiId;
      ygorgBtn.style.visibility = '';

  }
}

function FailedZoomDataOrgDB(passcode, err)
{
    const viewer = document.getElementById('zoom-viewer');
    if (viewer.zoomedCardId !== passcode)
        return;

    viewer.classList.add('konami','bad');
    document.getElementById('zoom-image').firstChild.src = 'https://db.ygorganization.com/img/no_data_card.png';
    document.getElementById('zoom-name').innerText = 'API failed';
    document.getElementById('zoom-text').innerText = ('Failed to get card data:\n-'+err);
}

function FailedZoomDataOrgDBModal(passcode, err)
{
    const viewer = document.getElementById('modal-viewer');
    if (viewer.zoomedCardId !== passcode)
        return;

    viewer.classList.add('konami','bad');
    document.getElementById('modal-zoom-image').firstChild.src = 'https://db.ygorganization.com/img/no_data_card.png';
    document.getElementById('modal-zoom-name').innerText = 'API failed';
    document.getElementById('modal-zoom-text').innerText = ('Failed to get card data:\n-'+err);
}

function UpdateZoomDataOrgDB(passcode, data)
{
    const viewer = document.getElementById('zoom-viewer');
    if (viewer.zoomedCardId !== passcode)
        return;

    const cardData = data.cardData.en;
    if (!cardData || (cardData.thisSrc.type !== 2))
    {
        FailedZoomDataOrgDB.bind(null,passcode)('No official card data for '+passcode+' is available');
        return;
    }

    document.getElementById('zoom-image').firstChild.src = ('https://db.ygorganization.com/artwork/'+data.cardId+'/'+data.artworks[0]);
    document.getElementById('zoom-name').innerText = cardData.name;

    if (cardData.pendulumEffectText)
        document.getElementById('zoom-text').innerText = ('[ Pendulum Effect ]\n'+cardData.pendulumEffectText+'\n----------------------------------------\n[ Monster Effect ]\n'+cardData.effectText);
    else
        document.getElementById('zoom-text').innerText = cardData.effectText;

    if (cardData.properties && cardData.properties.includes(6))
        document.getElementById('zoom-text').style.fontStyle = 'italic';

    var kdbBtn = document.getElementById('zoom-konamidb');
    kdbBtn.href = 'https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=' + data.cardId;
    kdbBtn.style.visibility = '';
    var ygorgBtn = document.getElementById('zoom-ygorgdb');
    ygorgBtn.href = 'https://db.ygorganization.com/card#' + data.cardId;
    ygorgBtn.style.visibility = '';

    viewer.classList.add('konami','good');
}

function UpdateZoomDataOrgDBModal(passcode, data)
{
    const viewer = document.getElementById('modal-viewer');
    if (viewer.zoomedCardId !== passcode)
        return;

    const cardData = data.cardData.en;
    if (!cardData || (cardData.thisSrc.type !== 2))
    {
        FailedZoomDataOrgDB.bind(null,passcode)('No official card data for '+passcode+' is available');
        return;
    }

    document.getElementById('modal-zoom-image').firstChild.src = ('https://db.ygorganization.com/artwork/'+data.cardId+'/'+data.artworks[0]);
    document.getElementById('modal-zoom-name').innerText = cardData.name;

    if (cardData.pendulumEffectText)
        document.getElementById('modal-zoom-text').innerText = ('[ Pendulum Effect ]\n'+cardData.pendulumEffectText+'\n----------------------------------------\n[ Monster Effect ]\n'+cardData.effectText);
    else
        document.getElementById('modal-zoom-text').innerText = cardData.effectText;

    if (cardData.properties && cardData.properties.includes(6))
        document.getElementById('modal-zoom-text').style.fontStyle = 'italic';

    var modalKdbBtn = document.getElementById('modal-zoom-konamidb');
    modalKdbBtn.href = 'https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=' + data.cardId;
    modalKdbBtn.style.visibility = '';
    var modalYgorgBtn = document.getElementById('modal-zoom-ygorgdb');
    modalYgorgBtn.href = 'https://db.ygorganization.com/card#' + data.cardId;
    modalYgorgBtn.style.visibility = '';

    viewer.classList.add('konami','good');
}

var zoomedCard = null;
function ZoomThisCard()
{
    hidden = isHidden(document.getElementById('zoom-viewer'));

    if (this != zoomedCard)
    {
        if (zoomedCard)
            zoomedCard.classList.remove('selected')
        zoomedCard = this;
        this.classList.add('selected');

        var id = this.cardId;

    if (hidden) {
      document.getElementById('modal-viewer').zoomedCardId = id;
      document.getElementById('modal-viewer').classList.remove('konami','good','bad');
      document.getElementById('modal-zoom-image').firstChild.removeAttribute('src');
      document.getElementById('modal-zoom-name').innerText = '';
      document.getElementById('modal-zoom-text').innerText = 'Loading card info from API...';
      document.getElementById('modal-zoom-text').style.fontStyle = '';
      document.getElementById('modal-zoom-ygorgdb').style.visibility = 'hidden';
      document.getElementById('modal-zoom-konamidb').style.visibility = 'hidden';

      if ((''+id).length <= 8)
      {
          document.getElementById('modal-zoom-yugipedia').href = ('https://yugipedia.com/wiki/' + ('0000000'+id).slice(-8));
          document.getElementById('modal-zoom-yugipedia').style.visibility = '';
      }
      else {
        document.getElementById('modal-zoom-yugipedia').style.visibility = 'hidden';
      }

      if (GetUserSettingBool('konamiDBData'))
      {
          window.RequestOrgDBData(id).then(UpdateZoomDataOrgDBModal.bind(null,id)).catch(FailedZoomDataOrgDBModal.bind(null,id));
      }
      else
      {
        document.getElementById('modal-zoom-image').firstChild.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + id + '.jpg';
          RequestCardData(id, UpdateZoomDataModal);
      }
      ShowModal('modal-viewer');
    } else {
      document.getElementById('zoom-viewer').zoomedCardId = id;
      document.getElementById('zoom-viewer').classList.remove('konami','good','bad');
      document.getElementById('zoom-image').firstChild.removeAttribute('src');
      document.getElementById('zoom-name').innerText = '';
      document.getElementById('zoom-text').innerText = 'Loading card info from API...';
      document.getElementById('zoom-text').style.fontStyle = '';
      document.getElementById('zoom-ygorgdb').style.visibility = 'hidden';
      document.getElementById('zoom-konamidb').style.visibility = 'hidden';

      if ((''+id).length <= 8)
      {
          document.getElementById('zoom-yugipedia').href = ('https://yugipedia.com/wiki/' + ('0000000'+id).slice(-8));
          document.getElementById('zoom-yugipedia').style.visibility = '';
      }
      else {
        document.getElementById('zoom-yugipedia').style.visibility = 'hidden';
      }

      if (GetUserSettingBool('konamiDBData'))
      {
          window.RequestOrgDBData(id).then(UpdateZoomDataOrgDB.bind(null,id)).catch(FailedZoomDataOrgDB.bind(null,id));
      }
      else
      {
        document.getElementById('zoom-image').firstChild.src = 'https://storage.googleapis.com/ygoprodeck.com/pics/' + id + '.jpg';
        RequestCardData(id, UpdateZoomData);
      }
    }
  }
}

function CloseZoomViewer()
{
    if (zoomedCard)
    {
        zoomedCard.classList.remove('selected');
        zoomedCard = null;
    }
    document.getElementById('zoom-viewer').zoomedCardId = null;
    document.getElementById('zoom-viewer').classList.remove('konami','good','bad');
    document.getElementById('zoom-image').firstChild.src = 'zoom-placeholder.png';
    document.getElementById('zoom-name').innerText = '';
    document.getElementById('zoom-text').innerText = 'Click any card to view it here...';
    document.getElementById('zoom-text').style.fontStyle = 'italic';
    document.getElementById('zoom-ygorgdb').style.visibility = 'hidden';
    document.getElementById('zoom-konamidb').style.visibility = 'hidden';
    document.getElementById('zoom-yugipedia').style.visibility = 'hidden';

    /* Modal viewer */
    document.getElementById('modal-viewer').zoomedCardId = null;
    document.getElementById('modal-viewer').classList.remove('konami','good','bad');
    document.getElementById('modal-zoom-image').firstChild.src = 'zoom-placeholder.png';
    document.getElementById('modal-zoom-name').innerText = '';
    document.getElementById('modal-zoom-text').innerText = 'Click any card to view it here...';
    document.getElementById('modal-zoom-text').style.fontStyle = 'italic';
    document.getElementById('modal-zoom-ygorgdb').style.visibility = 'hidden';
    document.getElementById('modal-zoom-konamidb').style.visibility = 'hidden';
    document.getElementById('modal-zoom-yugipedia').style.visibility = 'hidden';
}
