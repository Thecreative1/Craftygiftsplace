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

function Render-ProductCard {
  param($Product)

  $title = [System.Net.WebUtility]::HtmlEncode($Product.name)
  $alt = [System.Net.WebUtility]::HtmlEncode("$($Product.name) van Craftygiftsplace")
  $image = [System.Net.WebUtility]::HtmlEncode($Product.image)
  $url = [System.Net.WebUtility]::HtmlEncode($Product.etsy_url)
  $chips = @()
  $chips += "                <span class=""chip"">$([System.Net.WebUtility]::HtmlEncode($Product.price_label))</span>"

  foreach ($tag in $Product.tags) {
    $chips += "                <span class=""chip"">$([System.Net.WebUtility]::HtmlEncode($tag))</span>"
  }

  return @"
          <article class="product-card">
            <div class="card-media">
              <img src="$image" alt="$alt" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
            </div>
            <div class="card-body">
              <div class="product-meta">
$($chips -join "`n")
              </div>
              <h3>$title</h3>
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
    "kleine-cadeaus-en-diy" = "DIY sets, kleine gadgets en speelse houten ideeen om zelf te geven of te gebruiken."
    "overige-houten-cadeaus" = "Overige houten cadeaus die niet netjes in een kleinere groep vallen, maar wel perfect passen in de shop."
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
              <p>Hier vind je de volledige selectie houten cadeaus uit de shop, netjes gegroepeerd per type product.</p>
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
    image = $row.IMAGE1
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
  -Heading "Alle onderzetters" `
  -Description "Alle $($underzetters.Count) coaster designs uit de shop, van katten en fantasy tot sport, games en housewarming cadeau-ideeen." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster" `
  -ButtonLabel "Bekijk alle onderzetters op Etsy" `
  -Products $underzetters

$bladwijzersHtml = Render-CategorySection `
  -Heading "Alle bladwijzers" `
  -Description "Alle $($bladwijzers.Count) bladwijzers uit de shop voor lezers, fantasy-fans, sci-fi liefhebbers en cadeaumomenten." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" `
  -ButtonLabel "Bekijk alle bladwijzers op Etsy" `
  -Products $bladwijzers

$cadeausHtml = Render-GiftSections $cadeaus

Replace-MarkerBlock -Path "pages\onderzetters.html" -Marker "AUTO-CATALOG-ONDERZETTERS" -Content $underzettersHtml
Replace-MarkerBlock -Path "pages\bladwijzers.html" -Marker "AUTO-CATALOG-BLADWIJZERS" -Content $bladwijzersHtml
Replace-MarkerBlock -Path "pages\houten-cadeaus.html" -Marker "AUTO-CATALOG-HOUTEN-CADEAUS" -Content $cadeausHtml
