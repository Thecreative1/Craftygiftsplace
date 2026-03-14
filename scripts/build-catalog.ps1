$ErrorActionPreference = "Stop"

function Get-ShortTitle {
  param([string]$Title)

  $normalized = $Title -replace [char]0x2013, "-" -replace [char]0x2022, "-" -replace "\s+", " "
  $parts = $normalized -split "\s+\|\s+|\s+-\s+|:\s+"
  return $parts[0].Trim()
}

function Get-Category {
  param($Row)

  $text = ((($Row.TITLE | Out-String).Trim()) + " " + (($Row.TAGS | Out-String).Trim())).ToLowerInvariant()

  if ($text -match "bookmark|book mark|bladwijzer") {
    return "bladwijzers"
  }

  if ($text -match "coaster|onderzetter|untersetzer") {
    return "onderzetters"
  }

  return "houten-cadeaus"
}

function Get-Section {
  param(
    $Row,
    [string]$Category
  )

  if ($Category -ne "houten-cadeaus") {
    return $Category
  }

  $text = ((($Row.TITLE | Out-String).Trim()) + " " + (($Row.TAGS | Out-String).Trim())).ToLowerInvariant()

  if ($text -match "tealight|tea light|candle|incense") {
    return "decoratie-en-sfeer"
  }

  if ($text -match "ornament|bauble|christmas|xmas") {
    return "ornamenten-en-seizoenscadeaus"
  }

  if ($text -match "wedding|just married|memorial|closet|milestone|newborn|baby closet|baby milestone") {
    return "persoonlijke-cadeaus"
  }

  if ($text -match "door sign|door hanger|door knob|notice|\bsign\b") {
    return "deurhangers-en-borden"
  }

  if ($text -match "montessori|numicon|dinosaur|blanks|circle|keychain|key ring|comb|craft") {
    return "kleine-cadeaus-en-diy"
  }

  return "overige-houten-cadeaus"
}

function Get-CategoryUrl {
  param([string]$Category)

  switch ($Category) {
    "onderzetters" { return "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster" }
    "bladwijzers" { return "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" }
    default { return "https://www.etsy.com/shop/Craftygiftsplace?ref=dashboard-header" }
  }
}

function Humanize-Tag {
  param([string]$Tag)

  $clean = ($Tag -replace "_", " " -replace "\s+", " ").Trim(" ", '"')
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $null
  }

  return [System.Globalization.CultureInfo]::CurrentCulture.TextInfo.ToTitleCase($clean.ToLowerInvariant())
}

function Get-PriceLabel {
  param([string]$Price)

  $value = [decimal]::Parse($Price, [System.Globalization.CultureInfo]::InvariantCulture)
  return "EUR " + $value.ToString("0.00", [System.Globalization.CultureInfo]::InvariantCulture)
}

function Get-EtsyUrl {
  param([string]$Query)

  $encoded = [System.Uri]::EscapeDataString($Query)
  return "https://www.etsy.com/shop/Craftygiftsplace?search_query=$encoded"
}

function Test-IsEtsyImage {
  param([string]$Image)

  if ([string]::IsNullOrWhiteSpace($Image)) {
    return $false
  }

  return $Image -match "^https://i\.etsystatic\.com/.+/il_[^/]+\.[^/]+$"
}

function Get-EtsyImageVariantUrl {
  param(
    [string]$Image,
    [string]$Variant
  )

  if (-not (Test-IsEtsyImage $Image)) {
    return $Image
  }

  $match = [System.Text.RegularExpressions.Regex]::Match($Image, "/il_[^.\/]+(?<suffix>\.[^\/]+)$")

  if (-not $match.Success) {
    return $Image
  }

  return $Image.Substring(0, $match.Index) + "/il_$Variant" + $match.Groups["suffix"].Value
}

function Get-CardImageSource {
  param([string]$Image)

  if (-not (Test-IsEtsyImage $Image)) {
    return $Image
  }

  return Get-EtsyImageVariantUrl -Image $Image -Variant "600x600"
}

function Get-CardImageSrcSet {
  param([string]$Image)

  if (-not (Test-IsEtsyImage $Image)) {
    return $null
  }

  $small = Get-EtsyImageVariantUrl -Image $Image -Variant "340x270"
  $medium = Get-EtsyImageVariantUrl -Image $Image -Variant "600x600"
  $large = Get-EtsyImageVariantUrl -Image $Image -Variant "794xN"

  return "$small 340w, $medium 600w, $large 794w"
}

function Get-CardImageSizes {
  return "(max-width: 720px) calc(100vw - 1.25rem), (max-width: 1024px) calc(50vw - 2rem), 360px"
}

function Get-SectionLabel {
  param([string]$Section)

  switch ($Section) {
    "deurhangers-en-borden" { return "Deurhangers en borden" }
    "decoratie-en-sfeer" { return "Decoratie en sfeer" }
    "ornamenten-en-seizoenscadeaus" { return "Ornamenten en seizoenscadeaus" }
    "persoonlijke-cadeaus" { return "Persoonlijke cadeaus" }
    "kleine-cadeaus-en-diy" { return "Kleine cadeaus en DIY" }
    "overige-houten-cadeaus" { return "Overige houten cadeaus" }
    default { return $Section }
  }
}

function Normalize-Keyword {
  param([string]$Value)

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $null
  }

  return ($Value -replace "\s+", " ").Trim()
}

function Get-PrimaryKeyword {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags
  )

  $joinedTags = ($Tags -join " ").ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedTags -match "dog|dog paw|paw print") { return "houten onderzetter voor hondenliefhebbers" }
      if ($joinedTags -match "cat|feline|paw|pet") { return "houten onderzetter voor kattenliefhebbers" }
      if ($joinedTags -match "zodiac|astrology|horoscope|celestial|moon|witchy") { return "houten onderzetter met mystiek design" }
      if ($joinedTags -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return "houten onderzetter voor gamers en hobbyliefhebbers" }
      if ($joinedTags -match "housewarming|home decor|rustic|coastal|tile|nature|tree|floral|bee|leaf|wildlife|horse") { return "houten onderzetter voor housewarming en interieur" }
      return "houten onderzetter als cadeau"
    }
    "bladwijzers" {
      if ($joinedTags -match "dragon|fantasy|witch|gothic|lotr|tolkien") { return "houten bladwijzer voor fantasy lezers" }
      if ($joinedTags -match "dune|sci-fi|rocket") { return "houten bladwijzer voor sci-fi lezers" }
      if ($joinedTags -match "celtic|lighthouse|guitar|sardine|feather") { return "houten bladwijzer met bijzonder detail" }
      return "houten bladwijzer voor boekenliefhebbers"
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "houten deurhanger als origineel cadeau" }
        "decoratie-en-sfeer" { return "houten decoratie voor een warm interieur" }
        "ornamenten-en-seizoenscadeaus" { return "houten ornament als persoonlijk cadeau" }
        "persoonlijke-cadeaus" { return "gepersonaliseerd houten cadeau voor een bijzonder moment" }
        "kleine-cadeaus-en-diy" { return "klein houten cadeau of DIY set" }
        default { return "origineel houten cadeau met handgemaakte uitstraling" }
      }
    }
  }
}

function Get-SecondaryKeyword {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags
  )

  $joinedTags = ($Tags -join " ").ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedTags -match "dog|dog paw|paw print") { return "cadeau voor hondenliefhebbers" }
      if ($joinedTags -match "cat|feline") { return "cadeau voor kattenliefhebbers" }
      if ($joinedTags -match "zodiac|astrology|horoscope|celestial|moon|witchy") { return "housewarming cadeau" }
      if ($joinedTags -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return "origineel cadeau" }
      return "tafeldecoratie van hout"
    }
    "bladwijzers" {
      if ($joinedTags -match "dragon|fantasy|witch|gothic|lotr|tolkien") { return "fantasy cadeau" }
      if ($joinedTags -match "dune|sci-fi|rocket") { return "cadeau voor sci-fi lezers" }
      return "cadeau voor boekenliefhebbers"
    }
    default {
      switch ($Section) {
        "decoratie-en-sfeer" { return "woondecoratie" }
        "deurhangers-en-borden" { return "kamerdecoratie" }
        "persoonlijke-cadeaus" { return "gepersonaliseerd cadeau" }
        default { return "cadeau idee" }
      }
    }
  }
}

function Get-ProductDescription {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section,
    [string[]]$Tags
  )

  $cleanName = Normalize-Keyword $Name
  $joinedTags = ($Tags -join " ").ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedTags -match "dog|dog paw|paw print") {
        return "$cleanName brengt een warm accent op tafel en is een mooi cadeau voor hondenliefhebbers."
      }

      if ($joinedTags -match "cat|feline|paw|pet") {
        return "$cleanName geeft tafel en interieur een gezellige uitstraling en past perfect bij kattenliefhebbers."
      }

      if ($joinedTags -match "zodiac|astrology|horoscope|celestial|moon|witchy") {
        return "$cleanName geeft tafel en interieur een mystieke houten touch en past mooi bij housewarming of een persoonlijk cadeau."
      }

      if ($joinedTags -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") {
        return "$cleanName is een houten onderzetter met speels thema voor game night, hobbyhoek of een origineel cadeau."
      }

      return "$cleanName is een houten onderzetter met warme uitstraling voor tafel, huis en cadeau-momenten."
    }
    "bladwijzers" {
      if ($joinedTags -match "dragon|fantasy|witch|gothic|lotr|tolkien") {
        return "$cleanName is een houten bladwijzer met fantasy sfeer voor lezers die van detail en karakter houden."
      }

      if ($joinedTags -match "dune|sci-fi|rocket") {
        return "$cleanName is een houten bladwijzer voor sci-fi lezers en een bijzonder cadeau voor boekenliefhebbers."
      }

      if ($joinedTags -match "celtic|lighthouse|guitar|sardine|feather") {
        return "$cleanName geeft elk leesmoment een rustig en persoonlijk detail met een mooie houten afwerking."
      }

      return "$cleanName is een houten bladwijzer die lezen net wat persoonlijker en specialer maakt."
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" {
          return "$cleanName is een houten deurhanger die deur of kamer meteen een speelse en persoonlijke uitstraling geeft."
        }

        "decoratie-en-sfeer" {
          return "$cleanName is houten decoratie die warmte en sfeer brengt in huis."
        }

        "ornamenten-en-seizoenscadeaus" {
          return "$cleanName is een houten ornament met een warme uitstraling voor feestdagen en kleine cadeau-momenten."
        }

        "persoonlijke-cadeaus" {
          return "$cleanName is een gepersonaliseerd houten cadeau voor bruiloft, geboorte of een ander bijzonder moment."
        }

        "kleine-cadeaus-en-diy" {
          return "$cleanName is een klein houten item dat leuk is om te geven, te gebruiken of creatief af te werken."
        }

        default {
          return "$cleanName is een origineel houten cadeau met een warme, handgemaakte uitstraling."
        }
      }
    }
  }
}

function Get-AltText {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $cleanName = Normalize-Keyword $Name

  switch ($Category) {
    "onderzetters" { return "$cleanName houten onderzetter van Craftygiftsplace" }
    "bladwijzers" { return "$cleanName houten bladwijzer van Craftygiftsplace" }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "$cleanName houten deurhanger van Craftygiftsplace" }
        "decoratie-en-sfeer" { return "$cleanName houten decoratie van Craftygiftsplace" }
        "ornamenten-en-seizoenscadeaus" { return "$cleanName houten ornament van Craftygiftsplace" }
        default { return "$cleanName houten cadeau van Craftygiftsplace" }
      }
    }
  }
}

function Render-ProductCard {
  param($Product)

  $title = [System.Net.WebUtility]::HtmlEncode($Product.name)
  $alt = [System.Net.WebUtility]::HtmlEncode($Product.alt)
  $image = [System.Net.WebUtility]::HtmlEncode($Product.image)
  $imageSrcSet = [System.Net.WebUtility]::HtmlEncode(($Product.image_srcset | Out-String).Trim())
  $imageSizes = [System.Net.WebUtility]::HtmlEncode(($Product.image_sizes | Out-String).Trim())
  $imageSrcSetAttr = ""
  $imageSizesAttr = ""
  $url = [System.Net.WebUtility]::HtmlEncode($Product.etsy_url)
  $description = [System.Net.WebUtility]::HtmlEncode($Product.description)
  $chips = @()
  $chips += "                <span class=""chip"">$([System.Net.WebUtility]::HtmlEncode($Product.price_label))</span>"

  if (-not [string]::IsNullOrWhiteSpace($imageSrcSet)) {
    $imageSrcSetAttr = " srcset=""$imageSrcSet"""
  }

  if (-not [string]::IsNullOrWhiteSpace($imageSizes)) {
    $imageSizesAttr = " sizes=""$imageSizes"""
  }

  foreach ($tag in $Product.tags) {
    $chips += "                <span class=""chip"">$([System.Net.WebUtility]::HtmlEncode($tag))</span>"
  }

  return @"
          <article class="product-card">
            <div class="card-media">
              <img src="$image"$imageSrcSetAttr$imageSizesAttr alt="$alt" loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer" />
            </div>
            <div class="card-body">
              <div class="product-meta">
$($chips -join "`n")
              </div>
              <h3>$title</h3>
              <p>$description</p>
              <a class="btn" href="$url" target="_blank" rel="noopener">Open op Etsy</a>
            </div>
          </article>
"@
}

function Render-Grid {
  param($Products)

  if (-not $Products -or $Products.Count -eq 0) {
    return '      <div class="catalog-empty">Nog geen producten gevonden voor deze sectie.</div>'
  }

  $cards = $Products | ForEach-Object { Render-ProductCard $_ }

  return @"
      <div class="product-grid catalog-grid">
$($cards -join "`n")
      </div>
"@
}

function Render-CategorySection {
  param(
    [string]$Heading,
    [string]$Description,
    [string]$ButtonUrl,
    [string]$ButtonLabel,
    $Products
  )

  return @"
          <div class="catalog-header">
            <div>
              <h2>$([System.Net.WebUtility]::HtmlEncode($Heading))</h2>
              <p>$([System.Net.WebUtility]::HtmlEncode($Description))</p>
            </div>
            <a class="btn" href="$([System.Net.WebUtility]::HtmlEncode($ButtonUrl))" target="_blank" rel="noopener">$([System.Net.WebUtility]::HtmlEncode($ButtonLabel))</a>
          </div>
$((Render-Grid $Products))
"@
}

function Render-GiftSections {
  param($Products)

  $descriptions = @{
    "deurhangers-en-borden" = "Gamer signs, deurhangers, humorborden en andere houten ontwerpen voor deuren en kamers."
    "decoratie-en-sfeer" = "Tealight holders, incense accessoires en decoratieve stukken die meteen sfeer toevoegen."
    "ornamenten-en-seizoenscadeaus" = "Kerstornamenten en seizoenscadeaus met een persoonlijke of feestelijke toets."
    "persoonlijke-cadeaus" = "Babycadeaus, trouwcadeaus, keepsakes en andere stukken voor bijzondere momenten."
    "kleine-cadeaus-en-diy" = "DIY sets, kleine gadgets en speelse houten ideeen die leuk zijn om te geven of zelf te gebruiken."
    "overige-houten-cadeaus" = "Meer houten cadeaus met een eigen stijl en handgemaakte uitstraling."
  }

  $order = @(
    "deurhangers-en-borden",
    "decoratie-en-sfeer",
    "persoonlijke-cadeaus",
    "ornamenten-en-seizoenscadeaus",
    "kleine-cadeaus-en-diy",
    "overige-houten-cadeaus"
  )

  $blocks = foreach ($section in $order) {
    $items = @($Products | Where-Object { $_.section -eq $section })
    if ($items.Count -eq 0) {
      continue
    }

    @"
          <div class="catalog-block">
            <div class="catalog-header">
              <div>
                <h2>$([System.Net.WebUtility]::HtmlEncode((Get-SectionLabel $section)))</h2>
                <p>$([System.Net.WebUtility]::HtmlEncode($descriptions[$section]))</p>
              </div>
              <span class="chip">$($items.Count) producten</span>
            </div>
$((Render-Grid $items))
          </div>
"@
  }

  return @"
          <div class="catalog-header">
            <div>
              <h2>Alle houten cadeaus</h2>
              <p>Hier vind je houten cadeaus voor thuis, feestdagen en persoonlijke momenten, overzichtelijk ingedeeld per soort.</p>
            </div>
            <a class="btn" href="https://www.etsy.com/shop/Craftygiftsplace?ref=dashboard-header" target="_blank" rel="noopener">Bekijk alle houten cadeaus op Etsy</a>
          </div>
          <div class="catalog-stack">
$($blocks -join "`n")
          </div>
"@
}

function Replace-MarkerBlock {
  param(
    [string]$Path,
    [string]$Marker,
    [string]$Content
  )

  $fullPath = Join-Path $repoRoot $Path
  $text = Get-Content $fullPath -Raw
  $pattern = "(?s)(<!-- ${Marker}:START -->)(.*?)(<!-- ${Marker}:END -->)"
  $match = [System.Text.RegularExpressions.Regex]::Match($text, $pattern)
  if (-not $match.Success) {
    throw "Kon markerblok '$Marker' niet vinden in $Path."
  }

  $updated = $text.Substring(0, $match.Index) +
    $match.Groups[1].Value +
    "`r`n" +
    $Content.TrimEnd() +
    "`r`n          " +
    $match.Groups[3].Value +
    $text.Substring($match.Index + $match.Length)

  Set-Content -Path $fullPath -Value $updated -Encoding UTF8
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$csvPath = Join-Path $repoRoot "EtsyListingsDownload.csv"
$jsonPath = Join-Path $repoRoot "data\products.json"

$rows = Import-Csv $csvPath
$products = New-Object System.Collections.Generic.List[object]
$index = 0

foreach ($row in $rows) {
  $index++
  $category = Get-Category $row
  $section = Get-Section $row $category
  $displayName = Get-ShortTitle $row.TITLE
  $priceValue = [decimal]::Parse($row.PRICE, [System.Globalization.CultureInfo]::InvariantCulture)
  $tags = @()

  foreach ($tag in (((($row.TAGS | Out-String).Trim())) -split ",")) {
    $humanized = Humanize-Tag $tag
    if ($humanized) {
      $tags += $humanized
    }
    if ($tags.Count -ge 2) {
      break
    }
  }

  $slug = (($displayName.ToLowerInvariant() -replace "[^a-z0-9]+", "-" -replace "-{2,}", "-").Trim("-"))
  if ([string]::IsNullOrWhiteSpace($slug)) {
    $slug = "product-$index"
  }

  $product = [ordered]@{
    id = $slug
    name = $displayName
    title = $row.TITLE
    category = $category
    section = $section
    price_eur = [math]::Round([double]$priceValue, 2)
    price_label = Get-PriceLabel $row.PRICE
    tags = $tags
    description = Get-ProductDescription -Name $displayName -Category $category -Section $section -Tags $tags
    alt = Get-AltText -Name $displayName -Category $category -Section $section
    image = Get-CardImageSource $row.IMAGE1
    image_full = $row.IMAGE1
    image_srcset = Get-CardImageSrcSet $row.IMAGE1
    image_sizes = Get-CardImageSizes
    page = if ($category -eq "onderzetters") { "../pages/onderzetters.html#shop-catalog" } elseif ($category -eq "bladwijzers") { "../pages/bladwijzers.html#shop-catalog" } else { "../pages/houten-cadeaus.html#shop-catalog" }
    category_url = Get-CategoryUrl $category
    etsy_url = Get-EtsyUrl $displayName
  }

  $products.Add([pscustomobject]$product) | Out-Null
}

$products | ConvertTo-Json -Depth 6 | Set-Content -Path $jsonPath -Encoding UTF8

$underzetters = @($products | Where-Object { $_.category -eq "onderzetters" })
$bladwijzers = @($products | Where-Object { $_.category -eq "bladwijzers" })
$cadeaus = @($products | Where-Object { $_.category -eq "houten-cadeaus" })

$underzettersHtml = Render-CategorySection `
  -Heading "Alle houten onderzetters" `
  -Description "Ontdek $($underzetters.Count) houten onderzetters voor housewarming, kattenliefhebbers, fantasy designs en originele cadeau ideeen." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster" `
  -ButtonLabel "Bekijk alle onderzetters op Etsy" `
  -Products $underzetters

$bladwijzersHtml = Render-CategorySection `
  -Heading "Alle houten bladwijzers" `
  -Description "Bekijk $($bladwijzers.Count) houten bladwijzers voor lezers, fantasy fans, sci-fi liefhebbers en cadeau momenten met karakter." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" `
  -ButtonLabel "Bekijk alle bladwijzers op Etsy" `
  -Products $bladwijzers

$cadeausHtml = Render-GiftSections $cadeaus

Replace-MarkerBlock -Path "pages\onderzetters.html" -Marker "AUTO-CATALOG-ONDERZETTERS" -Content $underzettersHtml
Replace-MarkerBlock -Path "pages\bladwijzers.html" -Marker "AUTO-CATALOG-BLADWIJZERS" -Content $bladwijzersHtml
Replace-MarkerBlock -Path "pages\houten-cadeaus.html" -Marker "AUTO-CATALOG-HOUTEN-CADEAUS" -Content $cadeausHtml
