$ErrorActionPreference = "Stop"

function Get-ShortTitle {
  param([string]$Title)

  $normalized = $Title -replace [char]0x2013, "-" -replace [char]0x2022, "-" -replace "\s+", " "
  $parts = $normalized -split "\s+\|\s+|:\s+|,\s+|!\s*|\?\s*|\s+-\s*"
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
    "deurhangers-en-borden" { return "Door signs and wall pieces" }
    "decoratie-en-sfeer" { return "Decor and ambience" }
    "ornamenten-en-seizoenscadeaus" { return "Ornaments and seasonal gifts" }
    "persoonlijke-cadeaus" { return "Personalized gifts" }
    "kleine-cadeaus-en-diy" { return "Small gifts and DIY" }
    "overige-houten-cadeaus" { return "Other wooden gifts" }
    default { return $Section }
  }
}

function Get-SectionAnchor {
  param([string]$Section)

  switch ($Section) {
    "deurhangers-en-borden" { return "deurhangers-en-borden" }
    "decoratie-en-sfeer" { return "decoratie-en-sfeer" }
    "ornamenten-en-seizoenscadeaus" { return "ornamenten-en-seizoenscadeaus" }
    "persoonlijke-cadeaus" { return "persoonlijke-cadeaus" }
    "kleine-cadeaus-en-diy" { return "kleine-cadeaus-en-diy" }
    "overige-houten-cadeaus" { return "overige-houten-cadeaus" }
    default { return $null }
  }
}

function Normalize-Keyword {
  param([string]$Value)

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $null
  }

  return ($Value -replace "\s+", " ").Trim()
}

function Convert-ToTitleCasePreservingAcronyms {
  param([string]$Value)

  $clean = Normalize-Keyword $Value
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $clean
  }

  $textInfo = [System.Globalization.CultureInfo]::InvariantCulture.TextInfo
  $title = $textInfo.ToTitleCase($clean.ToLowerInvariant())
  $title = $title -replace "\bMmo\b", "MMO"
  $title = $title -replace "\bMoba\b", "MOBA"
  $title = $title -replace "\bFps\b", "FPS"
  $title = $title -replace "\bDiy\b", "DIY"
  $title = $title -replace "\bSci Fi\b", "Sci-Fi"
  $title = $title -replace "\bDo Not\b", "Do Not"

  return Normalize-Keyword $title
}

function Convert-ToSentenceCasePreservingAcronyms {
  param([string]$Value)

  $clean = Normalize-Keyword $Value
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $clean
  }

  $sentence = $clean.Substring(0, 1).ToUpperInvariant() + $clean.Substring(1)
  $sentence = $sentence -replace "\bMmo\b", "MMO"
  $sentence = $sentence -replace "\bMoba\b", "MOBA"
  $sentence = $sentence -replace "\bFps\b", "FPS"
  $sentence = $sentence -replace "\bDiy\b", "DIY"
  $sentence = $sentence -replace "\bSci-Fi\b", "sci-fi"

  return Normalize-Keyword $sentence
}

function Format-DisplayNameByCategory {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $clean = Normalize-Keyword $Name
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $clean
  }

  switch ($Category) {
    "onderzetters" {
      if ($clean -match "(?i)\bcalendar\b") {
        return "Personalized Calendar Coaster"
      }

      $motif = $clean
      $motif = $motif -replace "(?i)\bwooden drink coasters?\b", ""
      $motif = $motif -replace "(?i)\bwooden coasters?\b", ""
      $motif = $motif -replace "(?i)\bwood coasters?\b", ""
      $motif = $motif -replace "(?i)\bcoaster set\b", ""
      $motif = $motif -replace "(?i)\bcoasters?\b", ""
      $motif = $motif -replace "(?i)\bset of \d+(?:\s*or\s*\d+)?\b", ""
      $motif = $motif -replace "(?i)\b4 or 6\b", ""
      $motif = $motif -replace "(?i)\bset\b", ""
      $motif = $motif -replace "(?i)^wooden\s+", ""
      $motif = $motif -replace "(?i)\s+wooden$", ""
      $motif = $motif -replace "/\s*6\b", ""
      $motif = Normalize-Keyword ($motif.Trim(" ", "-", ",", ".", "/"))

      if ([string]::IsNullOrWhiteSpace($motif)) {
        return "Classic Wooden Coasters"
      }

      return Convert-ToTitleCasePreservingAcronyms "$motif Wooden Coasters"
    }
    "bladwijzers" {
      if ($clean -match "(?i)\bgift set\b") {
        return Convert-ToTitleCasePreservingAcronyms $clean
      }

      $motif = $clean
      $motif = $motif -replace "(?i)\bwooden bookmarks?\b", ""
      $motif = $motif -replace "(?i)\bbookmarks?\b", ""
      $motif = $motif -replace "(?i)^wooden\s+", ""
      $motif = $motif -replace "(?i)\s+wooden$", ""
      $motif = Normalize-Keyword ($motif.Trim(" ", "-", ",", ".", "/"))

      if ([string]::IsNullOrWhiteSpace($motif)) {
        return "Classic Wooden Bookmark"
      }

      return Convert-ToTitleCasePreservingAcronyms "$motif Wooden Bookmark"
    }
    default {
      return Convert-ToTitleCasePreservingAcronyms $clean
    }
  }
}

function Format-DisplayNameNlByCategory {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $clean = Normalize-Keyword $Name
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $clean
  }

  switch ($Category) {
    "onderzetters" {
      if ($clean -match "(?i)\bkalender\b") {
        return "Gepersonaliseerde kalenderonderzetter"
      }

      $motif = $clean
      $motif = $motif -replace "(?i)\bhouten onderzetters\b", ""
      $motif = $motif -replace "(?i)\bonderzetterset\b", ""
      $motif = $motif -replace "(?i)\bonderzetters\b", ""
      $motif = $motif -replace "(?i)\bonderzetter\b", ""
      $motif = $motif -replace "(?i)\bset van \d+(?:\s*of\s*\d+)?\b", ""
      $motif = $motif -replace "(?i)\b4 of 6\b", ""
      $motif = $motif -replace "(?i)\bset\b", ""
      $motif = $motif -replace "(?i)^houten\s+", ""
      $motif = $motif -replace "(?i)\s+houten$", ""
      $motif = $motif -replace "/\s*6\b", ""
      $motif = Normalize-Keyword ($motif.Trim(" ", "-", ",", ".", "/"))

      if ([string]::IsNullOrWhiteSpace($motif)) {
        return "Klassieke houten onderzetters"
      }

      return Convert-ToSentenceCasePreservingAcronyms "$motif houten onderzetters"
    }
    "bladwijzers" {
      if ($clean -match "(?i)\bcadeauset\b") {
        return Convert-ToSentenceCasePreservingAcronyms $clean
      }

      $motif = $clean
      $motif = $motif -replace "(?i)\bhouten bladwijzers\b", ""
      $motif = $motif -replace "(?i)\bhouten bladwijzer\b", ""
      $motif = $motif -replace "(?i)\bbladwijzers\b", ""
      $motif = $motif -replace "(?i)\bbladwijzer\b", ""
      $motif = $motif -replace "(?i)^houten\s+", ""
      $motif = $motif -replace "(?i)\s+houten$", ""
      $motif = Normalize-Keyword ($motif.Trim(" ", "-", ",", ".", "/"))

      if ([string]::IsNullOrWhiteSpace($motif)) {
        return "Klassieke houten bladwijzer"
      }

      return Convert-ToSentenceCasePreservingAcronyms "$motif houten bladwijzer"
    }
    default {
      return Convert-ToSentenceCasePreservingAcronyms $clean
    }
  }
}

function Get-SafeDisplayText {
  param([string]$Text)

  $clean = Normalize-Keyword $Text
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $clean
  }

  $clean = $clean -replace "(?i)\bFrank Herbert Dune\b", "Desert Saga"
  $clean = $clean -replace "(?i)\bDune\b", "Desert Saga"
  $clean = $clean -replace "(?i)\bWorld Of Warcraft\b", "Fantasy MMO"
  $clean = $clean -replace "(?i)\bWarcraft\b", "MMO"
  $clean = $clean -replace "(?i)\bWoW\b", "Fantasy MMO"
  $clean = $clean -replace "(?i)\bAzeroth\b", "Fantasy Realm"
  $clean = $clean -replace "(?i)\bMMORPG\b", "Fantasy MMO"
  $clean = $clean -replace "(?i)\bLeague Of Legends\b", "MOBA"
  $clean = $clean -replace "(?i)\bLoL\b", "MOBA"
  $clean = $clean -replace "(?i)\bFormula 1\b", "Motorsport"
  $clean = $clean -replace "(?i)\bStar Wars\b", "Space Saga"
  $clean = $clean -replace "(?i)\bStormtroopers?\b", "Space Trooper"
  $clean = $clean -replace "(?i)\bDarth Vader\b", "Space Villain"
  $clean = $clean -replace "(?i)\bMillennium Falcon\b", "Space Cruiser"
  $clean = $clean -replace "(?i)\bLord Of The Rings\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bLotr\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bTolkien\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bCounter-Strike\b", "FPS Gamer"
  $clean = $clean -replace "(?i)\bCSGO\b", "FPS Gamer"
  $clean = $clean -replace "(?i)\bCS Go\b", "FPS Gamer"
  $clean = $clean -replace "(?i)\bDnD\b", "Tabletop Adventure"
  $clean = $clean -replace "(?i)\bD&D\b", "Tabletop Adventure"
  $clean = $clean -replace "(?i)\bMiddle-Earth\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bHobbit\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bBilbo\b", "Fantasy Hero"
  $clean = $clean -replace "(?i)\bFrodo\b", "Fantasy Hero"
  $clean = $clean -replace "(?i)\bSting\b", "Fantasy Sword"
  $clean = $clean -replace "(?i)\bGondor\b", "Epic Tree"
  $clean = $clean -replace "(?i)\bDurin\b", "Epic Gate"
  $clean = $clean -replace "(?i)\bGandalf\b", "Epic Wizard"
  $clean = $clean -replace "(?i)\bMoria\b", "Epic Realm"
  $clean = $clean -replace "(?i)\bArrakis\b", "Desert World"
  $clean = $clean -replace "(?i)\bAtreides\b", "Desert House"
  $clean = $clean -replace "(?i)\bHarkonnen\b", "Desert House"
  $clean = $clean -replace "(?i)\bCorrino\b", "Desert House"

  return Normalize-Keyword $clean
}

function Test-IsSensitiveTheme {
  param([string]$Text)

  $clean = Normalize-Keyword $Text
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $false
  }

  return $clean -match "(?i)\b(dune|frank herbert|atreides|harkonnen|corrino|arrakis|warcraft|wow|formula 1|stormtrooper|darth vader|gondor|hobbit|bilbo|frodo|sting|counter-strike|cs go|cs|dnd|d&d)\b|world of warcraft|league of legends|star wars|millennium falcon|lord of the rings|middle-earth|dungeons and dragons"
}

function Get-SiteDisplayName {
  param([string]$Name)

  $original = Normalize-Keyword $Name
  $clean = Get-SafeDisplayText $original
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return $clean
  }

  $matchSource = (($original + " " + $clean) | Out-String).Trim().ToLowerInvariant()

  if ($matchSource -match "dune|desert saga" -and $matchSource -match "bookmark") {
    return "Desert Saga Wooden Bookmark"
  }

  if (($matchSource -match "wow|warcraft|world of warcraft|fantasy mmo") -and $matchSource -match "door sign|door hanger|door") {
    return "Fantasy Gamer Door Sign"
  }

  if (($matchSource -match "wow|warcraft|world of warcraft|fantasy mmo") -and $matchSource -match "coaster") {
    return "Fantasy MMO Coaster Set"
  }

  if (($matchSource -match "league of legends|\blol\b|moba") -and $matchSource -match "door") {
    return "MOBA Gamer Door Hanger"
  }

  if ($matchSource -match "formula 1|motorsport" -and $matchSource -match "coaster") {
    return "Motorsport Coaster Set"
  }

  if ($matchSource -match "cannabis|weed|420" -and $matchSource -match "coaster") {
    return "Cannabis Leaf Wooden Coasters"
  }

  if ($matchSource -match "bee|honey bee" -and $matchSource -match "coaster") {
    return "Bee Motif Wooden Coasters"
  }

  if ($matchSource -match "tree of life" -and $matchSource -match "coaster") {
    return "Tree of Life Wooden Coasters"
  }

  if ($matchSource -match "calendar" -and $matchSource -match "coaster") {
    return "Personalized Calendar Coaster"
  }

  if ($matchSource -match "cricket" -and $matchSource -match "coaster") {
    return "Cricket Dad Coaster"
  }

  if (($matchSource -match "camping|untersetzer|camper|vanlife") -and $matchSource -match "coaster|untersetzer") {
    return "Camping Wooden Coasters"
  }

  if ($matchSource -match "star wars|space saga" -and $matchSource -match "coaster") {
    return "Space Saga Coaster Set"
  }

  if (($matchSource -match "lord of the rings|lotr|tolkien|epic fantasy") -and $matchSource -match "tree of gondor|gondor|durin" -and $matchSource -match "bookmark") {
    return "Epic Tree Wooden Bookmark"
  }

  if (($matchSource -match "sting|middle-earth|bilbo|frodo|hobbit|fantasy sword") -and $matchSource -match "bookmark") {
    return "Fantasy Sword Wooden Bookmark"
  }

  if (($matchSource -match "lord of the rings|lotr|tolkien|epic fantasy") -and $matchSource -match "sting|fantasy sword") {
    return "Fantasy Sword Wooden Bookmark"
  }

  if (($matchSource -match "lord of the rings|lotr|tolkien|epic fantasy") -and $matchSource -match "bookmark") {
    return "Epic Fantasy Wooden Bookmark"
  }

  if ($matchSource -match "celtic" -and $matchSource -match "bookmark") {
    return "Celtic Wooden Bookmark"
  }

  if ($matchSource -match "lighthouse" -and $matchSource -match "bookmark") {
    return "Lighthouse Wooden Bookmark"
  }

  if (($matchSource -match "lord of the rings|lotr|tolkien|epic fantasy|speak friend|enterr") -and $matchSource -match "door") {
    return "Epic Fantasy Door Sign"
  }

  if ($matchSource -match "do not ring doorbell" -and $matchSource -match "sign|door") {
    return "Do Not Ring Door Sign"
  }

  if ($matchSource -match "closet dividers") {
    return "Wooden Baby Closet Dividers"
  }

  if (($matchSource -match "counter-strike|\bcs\b|fps gamer") -and $matchSource -match "coaster") {
    return "FPS Gamer Coaster Set"
  }

  if (($matchSource -match "counter-strike|\bcs\b|fps gamer") -and $matchSource -match "door") {
    return "FPS Gamer Door Hanger"
  }

  if (($matchSource -match "dnd|d&d|dungeons|tabletop adventure") -and $matchSource -match "coaster") {
    return "Tabletop Adventure Coaster Set"
  }

  if ($matchSource -match "book lover gift set|gift set" -and $matchSource -match "book|reader|bookmark|dragon|wizard|fantasy") {
    return "Fantasy Reader Gift Set"
  }

  if ($matchSource -match "prayer in progress|meditation|quiet time" -and $matchSource -match "door") {
    return "Prayer in Progress Door Hanger"
  }

  $clean = $clean -replace "(?i)\bworld of warcraft\b", "Fantasy MMO"
  $clean = $clean -replace "(?i)\bwow\b", "Fantasy MMO"
  $clean = $clean -replace "(?i)\bleague of legends\b", "MOBA"
  $clean = $clean -replace "(?i)\blol\b", "MOBA"
  $clean = $clean -replace "(?i)\bformula 1\b", "Motorsport"
  $clean = $clean -replace "(?i)\bstar wars\b", "Space Saga"
  $clean = $clean -replace "(?i)\blord of the rings\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\blotr\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\btolkien\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bdune\b", "Desert Saga"
  $clean = $clean -replace "(?i)\bcounter-strike\b", "FPS Gamer"
  $clean = $clean -replace "(?i)\bdnd\b", "Tabletop Adventure"
  $clean = $clean -replace "(?i)\bd&d\b", "Tabletop Adventure"
  $clean = $clean -replace "(?i)\bhobbit\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bmiddle-earth\b", "Epic Fantasy"
  $clean = $clean -replace "(?i)\bset of \d+(?:\s*or\s*\d+)?\b", ""
  $clean = $clean -replace "(?i)\bengraved\b", ""
  $clean = $clean -replace "(?i)\bhandcrafted\b", ""
  $clean = $clean -replace "(?i)\bhandmade\b", ""
  $clean = $clean -replace "(?i)\bwooden drink coasters?\b", "wooden coasters"
  $clean = $clean -replace "(?i)\bwood coasters?\b", "wooden coasters"
  $clean = $clean -replace "(?i)\bwood bookmark\b", "wooden bookmark"
  $clean = $clean -replace "(?i)\bdoor knob sign\b", "door hanger"
  $clean = $clean -replace "(?i)\bwooden coasters set\b", "wooden coasters"
  $clean = $clean -replace "(?i)\bcoasters set\b", "coasters"
  $clean = $clean -replace "(?i)\b4 or 6\b", ""
  $clean = $clean -replace "/\s*6\b", ""
  $clean = $clean -replace "(?i)\bBee Motif\b", "Bee Motif"
  $clean = $clean -replace "(?i)\bCarved Wooden Dragon\b", "Dragon"
  $clean = $clean -replace "(?i)\bCarved Dragon\b", "Dragon"
  $clean = $clean -replace "(?i)\bWooden Dragon\b", "Dragon"
  $clean = $clean -replace "(?i)\bChess-Themed\b", "Chess"
  $clean = $clean -replace "(?i)\bCarved Floral\b", "Floral"
  $clean = $clean -replace "(?i)\bWooden Leaf\b", "Leaf"
  $clean = $clean -replace "(?i)\bFunny Husband Medals\b", "Funny Husband Medal"
  $clean = $clean -replace "(?i)\bGerman Forest Animal\b", "Forest Animal"
  $clean = $clean -replace "(?i)\bReligious\b", "Faith-Inspired"
  $clean = $clean -replace "\s{2,}", " "
  $clean = $clean.Trim(" ", "-", ",", "!", ".", ":")

  return Format-DisplayNameByCategory -Name $clean -Category ($(if ($matchSource -match "bookmark") { "bladwijzers" } elseif ($matchSource -match "coaster|untersetzer") { "onderzetters" } else { "houten-cadeaus" })) -Section ""
}

function Get-SiteDisplayNameNl {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $localized = Normalize-Keyword $Name
  if ([string]::IsNullOrWhiteSpace($localized)) {
    return $localized
  }

  $localized = $localized -replace "(?i)\bHandmade\b", "Handgemaakte"
  $localized = $localized -replace "(?i)\bHandcrafted\b", "Handgemaakte"
  $localized = $localized -replace "(?i)\bEngraved\b", "Gegraveerde"
  $localized = $localized -replace "(?i)\bCarved\b", "Uitgesneden"
  $localized = $localized -replace "(?i)\bPersonalized\b", "Gepersonaliseerde"
  $localized = $localized -replace "(?i)\bPersonalised\b", "Gepersonaliseerde"
  $localized = $localized -replace "(?i)\bGift Set\b", "Cadeauset"
  $localized = $localized -replace "(?i)\bWooden Coasters\b", "Houten onderzetters"
  $localized = $localized -replace "(?i)\bWood Coasters\b", "Houten onderzetters"
  $localized = $localized -replace "(?i)\bCoaster Set\b", "Onderzetterset"
  $localized = $localized -replace "(?i)\bCoasters\b", "Onderzetters"
  $localized = $localized -replace "(?i)\bCoaster\b", "Onderzetter"
  $localized = $localized -replace "(?i)\bWooden Bookmark\b", "Houten bladwijzer"
  $localized = $localized -replace "(?i)\bBookmarks\b", "Bladwijzers"
  $localized = $localized -replace "(?i)\bBookmark\b", "Bladwijzer"
  $localized = $localized -replace "(?i)\bDoor Hanger\b", "Deurhanger"
  $localized = $localized -replace "(?i)\bDoor Sign\b", "Deurbord"
  $localized = $localized -replace "(?i)\bTealight Holder\b", "Theelichthouder"
  $localized = $localized -replace "(?i)\bIncense Burner\b", "Wierookhouder"
  $localized = $localized -replace "(?i)\bMilestone Discs\b", "Mijlpaalschijven"
  $localized = $localized -replace "(?i)\bCloset Dividers\b", "Kastverdelers"
  $localized = $localized -replace "(?i)\bWooden Dinosaur Shapes\b", "Houten dinosaurusvormen"
  $localized = $localized -replace "(?i)\bCircle Blanks\b", "Houten cirkels"
  $localized = $localized -replace "(?i)\bKeychain\b", "Sleutelhanger"
  $localized = $localized -replace "(?i)\bCalendar\b", "Kalender"
  $localized = $localized -replace "(?i)\bLighthouse\b", "Vuurtoren"
  $localized = $localized -replace "(?i)\bEco-Friendly\b", "Eco"
  $localized = $localized -replace "(?i)\bSign\b", "bord"
  $localized = $localized -replace "(?i)\b4 or 6\b", "4 of 6"
  $localized = $localized -replace "(?i)\bCat And Moon\b", "kat en maan"
  $localized = $localized -replace "(?i)\bSun And Moon\b", "zon en maan"
  $localized = $localized -replace "(?i)\bMoon Cat Shadow\b", "maan en kat"
  $localized = $localized -replace "(?i)\bDog Paw\b", "hondenpoot"
  $localized = $localized -replace "(?i)\bDragon Eye\b", "drakenoog"
  $localized = $localized -replace "(?i)\bDragon\b", "draak"
  $localized = $localized -replace "(?i)\bTree Of Life\b", "levensboom"
  $localized = $localized -replace "(?i)\bLeaf\b", "blad"
  $localized = $localized -replace "(?i)\bFloral\b", "bloemen"
  $localized = $localized -replace "(?i)\bAnchor\b", "anker"
  $localized = $localized -replace "(?i)\bCeltic Knot\b", "keltische knoop"
  $localized = $localized -replace "(?i)\bCeltic\b", "keltische"
  $localized = $localized -replace "(?i)\bMayan Disc\b", "maya-schijf"
  $localized = $localized -replace "(?i)\bGerman Forest Animal\b", "bosdieren"
  $localized = $localized -replace "(?i)\bPortuguese Tile\b", "Portugese tegel"
  $localized = $localized -replace "(?i)\bPersian Turkish\b", "Perzische tegel"
  $localized = $localized -replace "(?i)\bSamurai Mask\b", "samoeraimasker"
  $localized = $localized -replace "(?i)\bSpider Web\b", "spinnenweb"
  $localized = $localized -replace "(?i)\bGothic Skull\b", "gotische schedel"
  $localized = $localized -replace "(?i)\bWildlife\b", "wilde dieren"
  $localized = $localized -replace "(?i)\bReligious\b", "religieuze"
  $localized = $localized -replace "(?i)\bSpace Saga\b", "ruimtesaga"
  $localized = $localized -replace "(?i)\bDesert Saga\b", "woestijnsaga"
  $localized = $localized -replace "(?i)\bEpic Fantasy\b", "epische fantasy"
  $localized = $localized -replace "(?i)\bMy First Christmas Ornament\b", "mijn eerste kerstornament"
  $localized = $localized -replace "(?i)\bDIY Christmas Ornaments\b", "kerstornamenten om zelf te versieren"
  $localized = $localized -replace "(?i)\bDo Not Ring\b", "niet aanbellen"
  $localized = $localized -replace "(?i)\bNo Cameras\b", "geen camera's"
  $localized = $localized -replace "(?i)\bFunny Husband Medals\b", "grappige medailles voor hem"
  $localized = $localized -replace "(?i)\bFunny Husband Medal\b", "grappige medaille voor hem"
  $localized = $localized -replace "(?i)\bFunny Swear Word\b", "ondeugende tekst"
  $localized = $localized -replace "(?i)\bCarved Floral\b", "bloemen"
  $localized = $localized -replace "(?i)\bZodiac Set\b", "zodiac"
  $localized = $localized -replace "(?i)\bForest Animal\b", "bosdieren"
  $localized = $localized -replace "(?i)\bFaith-Inspired\b", "religieuze"
  $localized = $localized -replace "(?i)\bLaser Birch\b", "berkenhouten"
  $localized = $localized -replace "(?i)\bBirch\b", "berken"
  $localized = $localized -replace "(?i)\bHand-Painted\b", "handbeschilderde"
  $localized = $localized -replace "(?i)\bSports Ball\b", "sportbal"
  $localized = $localized -replace "(?i)\bSugar Skull\b", "suikerschedel"
  $localized = $localized -replace "(?i)\bAces Poker\b", "pokeraas"
  $localized = $localized -replace "(?i)\bPrayer In Progress\b", "gebed bezig"
  $localized = $localized -replace "(?i)\bJust Married\b", "pasgetrouwd"
  $localized = $localized -replace "(?i)\bPet Memorial Plaque\b", "herinneringsplaat voor huisdier"
  $localized = $localized -replace "(?i)\bBald Man's Comb\b", "kam voor kale man"
  $localized = $localized -replace "(?i)\bUpcycled Ram\b", "upcyclede RAM"
  $localized = $localized -replace "(?i)\bMushroom Moon\b", "paddenstoel en maan"
  $localized = $localized -replace "(?i)\bWiccan Symbol\b", "wicca-symbool"
  $localized = $localized -replace "(?i)\bWiccan\b", "wicca"
  $localized = $localized -replace "(?i)\bGaming Do Not Disturb\b", "gaming niet storen"
  $localized = $localized -replace "(?i)\bDIY Halloween Kit\b", "Halloween knutselset"
  $localized = $localized -replace "(?i)\bPicasso Animal Line Art\b", "Picasso dierenlijnkunst"
  $localized = $localized -replace "(?i)\bFantasy Reader\b", "fantasylezer"
  $localized = $localized -replace "(?i)\bNumicon Set\b", "Numicon set"
  $localized = $localized -replace "(?i)\bBirch houten Houten cirkels\b", "berkenhouten cirkels"
  $localized = $localized -replace "(?i)\bBerken houten Houten cirkels\b", "berkenhouten cirkels"
  $localized = $localized -replace "(?i)\bGaming niet storen bord\b", "gaming niet-storenbord"
  $localized = $localized -replace "(?i)\bChess\b", "schaak"
  $localized = $localized -replace "(?i)\bBaby\b", "baby"
  $localized = $localized -replace "(?i)\bTeam\b", "team"
  $localized = $localized -replace "(?i)\bHorse\b", "paard"
  $localized = $localized -replace "(?i)\bCat\b", "kat"
  $localized = $localized -replace "(?i)\bBee\b", "bij"
  $localized = $localized -replace "(?i)\bBee Motif\b", "bijenmotief"
  $localized = $localized -replace "(?i)\bwooden\b", "houten"
  $localized = $localized -replace "(?i)\bwood\b", "houten"
  $localized = $localized -replace "\s{2,}", " "

  if ($Category -eq "houten-cadeaus" -and $Section -eq "decoratie-en-sfeer" -and $localized -notmatch "(?i)theelichthouder|wierookhouder") {
    $localized = $localized -replace "(?i)\bhouten cadeau\b", "houten decoratie"
  }

  $localized = $localized.Trim(" ", "-", ",", "!", ".", ":")

  return Format-DisplayNameNlByCategory -Name $localized -Category $Category -Section $Section
}

function Get-LocalizedTagNl {
  param([string]$Tag)

  $localized = Normalize-Keyword $Tag

  if ([string]::IsNullOrWhiteSpace($localized)) {
    return $null
  }

  $localized = $localized -replace "(?i)\bcoasters\b", "Onderzetters"
  $localized = $localized -replace "(?i)\bcoaster\b", "Onderzetter"
  $localized = $localized -replace "(?i)\bbookmark\b", "Bladwijzer"
  $localized = $localized -replace "(?i)\bbookmarks\b", "Bladwijzers"
  $localized = $localized -replace "(?i)\bwooden\b", "Houten"
  $localized = $localized -replace "(?i)\bgift\b", "Cadeau"
  $localized = $localized -replace "(?i)\bgifts\b", "Cadeaus"
  $localized = $localized -replace "(?i)\bhome decor\b", "Woondecoratie"
  $localized = $localized -replace "(?i)\bbook lover\b", "Boekenliefhebber"
  $localized = $localized -replace "(?i)\bcat lover\b", "Kattenliefhebber"
  $localized = $localized -replace "(?i)\breader\b", "Lezer"
  $localized = $localized -replace "(?i)\bdoor sign\b", "Deurbord"
  $localized = $localized -replace "(?i)\bdoor hanger\b", "Deurhanger"
  $localized = $localized -replace "(?i)\blaser engraved\b", "Laser gegraveerd"
  $localized = $localized -replace "(?i)\bhome bar decor\b", "Bar decoratie"
  $localized = $localized -replace "(?i)\broom decor\b", "Kamerdecoratie"
  $localized = $localized -replace "(?i)\breader gift\b", "Lezerscadeau"
  $localized = $localized -replace "(?i)\bhusband gift\b", "Cadeau voor hem"
  $localized = $localized -replace "(?i)\bgamer gift\b", "Gamer cadeau"
  $localized = $localized -replace "(?i)\bdog paw\b", "Hondenpoot"
  $localized = $localized -replace "(?i)\bpaw print\b", "Pootafdruk"
  $localized = $localized -replace "(?i)\bastrology\b", "Astrologie"
  $localized = $localized -replace "(?i)\bpet lover'?s?\b", "Dierenliefhebber"
  $localized = $localized -replace "(?i)\bforest animal\b", "Bosdieren"
  $localized = $localized -replace "(?i)\bbaby keepsake\b", "Babyherinnering"
  $localized = $localized -replace "(?i)\bdiy\b", "Zelf maken"
  $localized = $localized -replace "(?i)\bdisc blanks\b", "Houten schijven"
  $localized = $localized -replace "(?i)\bsamurai\b", "Samoerai"
  $localized = $localized -replace "(?i)\bmask\b", "Masker"
  $localized = $localized -replace "(?i)\bchristian\b", "Christelijke"
  $localized = $localized -replace "(?i)\bvirgin mary\b", "Maria"
  $localized = $localized -replace "(?i)\bcloset dividers\b", "Kastverdelers"
  $localized = $localized -replace "(?i)\bnursery organizer\b", "Kinderkamer organizer"
  $localized = $localized -replace "(?i)\bhalloween decor\b", "Halloween decoratie"
  $localized = $localized -replace "(?i)\bspooky candle holder\b", "Spannende kaarshouder"
  $localized = $localized -replace "(?i)\bideas\b", "Ideeen"
  $localized = $localized -replace "(?i)\bdecor\b", "Decoratie"

  return Normalize-Keyword $localized
}

function Get-StableVariantIndex {
  param(
    [string]$Text,
    [int]$Modulo = 3
  )

  $sum = 0

  foreach ($char in (Normalize-Keyword $Text).ToCharArray()) {
    $sum += [int][char]$char
  }

  return $sum % [Math]::Max($Modulo, 1)
}

function Get-ThemePhrase {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "dog|paw") { return "paw-print detail" }
      if ($joinedText -match "cat|feline") { return "cat-themed detail" }
      if ($joinedText -match "zodiac|astrology|horoscope|moon|celestial|witchy") { return "celestial engraving" }
      if ($joinedText -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return "playful themed detail" }
      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") { return "bold alternative detail" }
      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") { return "coastal detail" }
      if ($joinedText -match "bee|honey") { return "bee engraving" }
      if ($joinedText -match "horse") { return "horse-themed detail" }
      if ($joinedText -match "wildlife|forest") { return "forest-and-wildlife detail" }
      if ($joinedText -match "leaf|tree|floral|nature|rustic") { return "nature-inspired detail" }
      if ($joinedText -match "tile|persian|mayan|samurai|viking|buddha") { return "ornamental detail" }
      return "warm engraved detail"
    }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|lotr|tolkien") { return "fantasy detail" }
      if ($joinedText -match "dune|sci-fi|rocket") { return "sci-fi flair" }
      if ($joinedText -match "celtic|lighthouse|guitar|sardine|feather") { return "intricate engraved detail" }
      return "wooden detail"
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "statement detail" }
        "decoratie-en-sfeer" { return "cozy decorative detail" }
        "ornamenten-en-seizoenscadeaus" { return "seasonal detail" }
        "persoonlijke-cadeaus" { return "keepsake detail" }
        "kleine-cadeaus-en-diy" { return "creative wooden detail" }
        default { return "handmade wooden detail" }
      }
    }
  }
}

function Get-AudiencePhrase {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "dog|paw") { return "dog lovers and cozy coffee tables" }
      if ($joinedText -match "cat|feline") { return "cat lovers and cozy corners" }
      if ($joinedText -match "zodiac|astrology|horoscope|moon|celestial|witchy") { return "astrology gifts and warm interiors" }
      if ($joinedText -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return "game rooms, desks and hobby-inspired gifts" }
      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") { return "alternative decor lovers and cozy corners" }
      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") { return "beach homes, campers and relaxed hosting" }
      if ($joinedText -match "bee|honey") { return "garden lovers and small thank-you gifts" }
      if ($joinedText -match "horse") { return "horse lovers and warm tabletops" }
      if ($joinedText -match "wildlife|forest") { return "rustic homes and thoughtful table gifts" }
      if ($joinedText -match "leaf|tree|floral|nature|rustic") { return "nature lovers, housewarming gifts and everyday tables" }
      if ($joinedText -match "tile|persian|mayan|samurai|viking|buddha") { return "decor lovers and conversation-starting tables" }
      return "everyday tables and easy gifting"
    }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|lotr|tolkien") { return "fantasy readers and special book gifts" }
      if ($joinedText -match "dune|sci-fi|rocket") { return "sci-fi readers and themed book gifts" }
      return "book lovers and quiet reading moments" }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "doors, desks and personality-filled rooms" }
        "decoratie-en-sfeer" { return "shelves, side tables and cozy homes" }
        "ornamenten-en-seizoenscadeaus" { return "holiday styling and small meaningful gifts" }
        "persoonlijke-cadeaus" { return "weddings, babies and milestone moments" }
        "kleine-cadeaus-en-diy" { return "craft desks, playful gifting and creative projects" }
        default { return "warm homes and thoughtful gifting" }
      }
    }
  }
}

function Get-DecisionCue {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "cat|feline|zodiac|astrology|moon|celestial|witchy") {
        return "Laser-cut from wood and easy to style on coffee tables or desks."
      }

      if ($joinedText -match "game|gaming|chess|checkers|poker|dart|formula|fishing|golf|sport") {
        return "A practical themed gift for game rooms, desks and everyday drinks."
      }

      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") {
        return "A bold wooden accent for desks, side tables and personality-filled spaces."
      }

      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") {
        return "A practical wooden set for relaxed hosting, campers and easy everyday drinks."
      }

      if ($joinedText -match "wildlife|forest") {
        return "A gift-ready wooden accent for cabin spaces, coffee tables and thoughtful hosting."
      }

      if ($joinedText -match "bee|leaf|tree|floral|nature|rustic|wedding|just married") {
        return "A gift-ready wooden accent for nature-led homes, shared tables and relaxed hosting."
      }

      if ($joinedText -match "horse") {
        return "A sturdy wooden set that feels easy to gift and display in everyday spaces."
      }

      if ($joinedText -match "tile|persian|mayan|samurai|viking|buddha") {
        return "An easy conversation piece for dinner tables, coffee corners and thoughtful gifting."
      }

      return "A useful wooden accent that feels gift-ready without being overcomplicated."
    }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|epic fantasy|sword") {
        return "Slim, lightweight and easy to tuck into fantasy books or reader gift boxes."
      }

      if ($joinedText -match "desert saga|sci-fi|rocket") {
        return "A lightweight reading gift that slips neatly between favorite pages."
      }

      return "Slim, lightweight and easy to add to a favorite book or reader gift."
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "Easy to hang and made for doors, desks or cozy corners with personality." }
        "decoratie-en-sfeer" { return "A gift-ready wooden accent for shelves, side tables and warm evening spaces." }
        "ornamenten-en-seizoenscadeaus" { return "Lightweight, easy to display and well suited to seasonal gifting." }
        "persoonlijke-cadeaus" { return "Well suited to milestone gifting, keepsakes and personalized moments." }
        "kleine-cadeaus-en-diy" { return "An easy small gift for craft desks, stocking fillers or playful everyday use." }
        default { return "Designed to feel easy to gift, display and enjoy in everyday spaces." }
      }
    }
  }
}

function Get-ShortCtaName {
  param([string]$Name)

  $cleanName = Normalize-Keyword $Name

  if ($cleanName.Length -le 42) {
    return $cleanName
  }

  $trimmed = ($cleanName.Substring(0, 42) -replace "\s+\S*$", "").Trim()

  if ([string]::IsNullOrWhiteSpace($trimmed)) {
    $trimmed = $cleanName.Substring(0, 42).Trim()
  }

  return "$trimmed..."
}

function Get-ProductCtaLabel {
  param([string]$Name)

  return "View $(Get-ShortCtaName $Name) on Etsy"
}

function Get-SensitiveBrowseQuery {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $lower = (Normalize-Keyword $Name).ToLowerInvariant()

  switch ($Category) {
    "bladwijzers" {
      if ($lower -match "desert|space|rocket") { return "sci-fi wooden bookmark" }
      if ($lower -match "fantasy|dragon|epic") { return "fantasy wooden bookmark" }
      return "wooden bookmark"
    }
    "onderzetters" {
      if ($lower -match "space|motorsport|tabletop|fps|mmo") { return "themed wooden coasters" }
      return "wooden coasters"
    }
    default {
      if ($Section -eq "deurhangers-en-borden") {
        if ($lower -match "fantasy") { return "epic fantasy door sign" }
        if ($lower -match "moba|mmo|fps") { return "wooden gamer door sign" }
        return "wooden door sign"
      }

      return "wooden gifts"
    }
  }
}

function Get-SensitiveCtaLabel {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $lower = (Normalize-Keyword $Name).ToLowerInvariant()

  switch ($Category) {
    "bladwijzers" {
      if ($lower -match "desert|space|rocket") { return "Browse sci-fi bookmarks on Etsy" }
      if ($lower -match "fantasy|dragon|epic") { return "Browse fantasy bookmarks on Etsy" }
      return "Browse wooden bookmarks on Etsy"
    }
    "onderzetters" {
      if ($lower -match "space|motorsport|tabletop|fps|mmo") { return "Browse themed coasters on Etsy" }
      return "Browse wooden coasters on Etsy"
    }
    default {
      if ($Section -eq "deurhangers-en-borden") {
        if ($lower -match "moba|mmo|fps|fantasy") { return "Browse gamer room signs on Etsy" }
        return "Browse wooden door signs on Etsy"
      }

      return "Browse wooden gifts on Etsy"
    }
  }
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
      if ($joinedTags -match "housewarming|home decor|rustic|coastal|tile|nature|tree|floral|bee|leaf|wildlife|horse") { return "houten onderzetter voor verhuiscadeaus en interieur" }
      return "houten onderzetter als cadeau"
    }
    "bladwijzers" {
      if ($joinedTags -match "dragon|fantasy|witch|gothic|lotr|tolkien") { return "houten bladwijzer voor fantasylezers" }
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
      if ($joinedTags -match "zodiac|astrology|horoscope|celestial|moon|witchy") { return "verhuiscadeau" }
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

function Get-UiTags {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "dog|paw") { return @("Dog lover", "Everyday use") }
      if ($joinedText -match "cat|feline") { return @("Cat lover", "Cozy decor") }
      if ($joinedText -match "zodiac|astrology|horoscope|moon|celestial|witchy") { return @("Astrology", "Housewarming") }
      if ($joinedText -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return @("Game night", "Gift-ready") }
      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") { return @("Bold decor", "Statement gift") }
      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") { return @("Coastal style", "Host gift") }
      if ($joinedText -match "bee|honey|leaf|tree|floral|nature|rustic|wildlife|forest") { return @("Nature decor", "Housewarming") }
      return @("Tabletop decor", "Gift-ready")
    }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|lotr|tolkien|epic") { return @("Fantasy reader", "Book gift") }
      if ($joinedText -match "dune|desert|sci-fi|rocket|space") { return @("Sci-fi reader", "Gift-ready") }
      return @("Book lover", "Reading nook")
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return @("Door decor", "Desk accent") }
        "decoratie-en-sfeer" { return @("Cozy decor", "Shelf styling") }
        "ornamenten-en-seizoenscadeaus" { return @("Seasonal gift", "Keepsake") }
        "persoonlijke-cadeaus" { return @("Personalized", "Milestone gift") }
        "kleine-cadeaus-en-diy" { return @("Creative set", "Small gift") }
        default { return @("Wooden gift", "Thoughtful present") }
      }
    }
  }
}

function Get-UiTagsNl {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "dog|paw") { return @("Hondenliefhebber", "Dagelijks gebruik") }
      if ($joinedText -match "cat|feline") { return @("Kattenliefhebber", "Gezellige decoratie") }
      if ($joinedText -match "zodiac|astrology|horoscope|moon|celestial|witchy") { return @("Astrologie", "Verhuiscadeau") }
      if ($joinedText -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return @("Spelavond", "Cadeauklaar") }
      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") { return @("Karaktervol decor", "Origineel cadeau") }
      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") { return @("Kuststijl", "Gastcadeau") }
      if ($joinedText -match "bee|honey|leaf|tree|floral|nature|rustic|wildlife|forest") { return @("Natuurlijke decoratie", "Verhuiscadeau") }
      return @("Tafeldecoratie", "Cadeauklaar")
    }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|lotr|tolkien|epic") { return @("Fantasylezer", "Boekcadeau") }
      if ($joinedText -match "dune|desert|sci-fi|rocket|space") { return @("Sci-fi lezer", "Cadeauklaar") }
      return @("Boekenliefhebber", "Leeshoek") }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return @("Deurdecoratie", "Bureauaccent") }
        "decoratie-en-sfeer" { return @("Gezellige decoratie", "Plankstyling") }
        "ornamenten-en-seizoenscadeaus" { return @("Seizoenscadeau", "Herinnering") }
        "persoonlijke-cadeaus" { return @("Persoonlijk", "Mijlpaalcadeau") }
        "kleine-cadeaus-en-diy" { return @("Creatieve set", "Klein cadeau") }
        default { return @("Houten cadeau", "Doordacht cadeau") }
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

  $themePhrase = Get-ThemePhrase -Category $Category -Section $Section -Tags $Tags -Name $Name
  $audiencePhrase = Get-AudiencePhrase -Category $Category -Section $Section -Tags $Tags -Name $Name
  $decisionCue = Get-DecisionCue -Category $Category -Section $Section -Tags $Tags -Name $Name
  $variant = Get-StableVariantIndex -Text $Name -Modulo 5

  switch ($Category) {
    "onderzetters" {
      switch ($variant) {
        0 { return "Protects tables with $themePhrase and suits $audiencePhrase. $decisionCue" }
        1 { return "Made for $audiencePhrase, this wooden coaster set adds $themePhrase. $decisionCue" }
        2 { return "A giftable coaster set that brings $themePhrase to $audiencePhrase. $decisionCue" }
        3 { return "Use it for everyday drinks when you want $themePhrase around $audiencePhrase. $decisionCue" }
        default { return "Keeps mugs and glasses off the table while adding $themePhrase for $audiencePhrase. $decisionCue" }
      }
    }
    "bladwijzers" {
      switch ($variant) {
        0 { return "Keeps your place with $themePhrase and suits $audiencePhrase. $decisionCue" }
        1 { return "A slim wooden bookmark for $audiencePhrase, finished with $themePhrase. $decisionCue" }
        2 { return "Adds $themePhrase to a favorite read for $audiencePhrase. $decisionCue" }
        3 { return "Made for daily reading and easy gifting, with $themePhrase for $audiencePhrase. $decisionCue" }
        default { return "A thoughtful bookmark that brings $themePhrase to $audiencePhrase. $decisionCue" }
      }
    }
    default {
      switch ($variant) {
        0 { return "Adds $themePhrase to $audiencePhrase. $decisionCue" }
        1 { return "Made for $audiencePhrase, this wooden piece brings $themePhrase. $decisionCue" }
        2 { return "A thoughtful wooden gift with $themePhrase for $audiencePhrase. $decisionCue" }
        3 { return "Easy to display and easy to gift, with $themePhrase for $audiencePhrase. $decisionCue" }
        default { return "A handcrafted wooden accent for $audiencePhrase with $themePhrase. $decisionCue" }
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
  $lowerName = $cleanName.ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($lowerName -match "coaster") {
        return "$cleanName by Craftygiftsplace"
      }

      return "$cleanName wooden coaster by Craftygiftsplace"
    }
    "bladwijzers" {
      if ($lowerName -match "bookmark") {
        return "$cleanName by Craftygiftsplace"
      }

      return "$cleanName wooden bookmark by Craftygiftsplace"
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" {
          if ($lowerName -match "sign|door hanger|hanger|plaque") {
            return "$cleanName by Craftygiftsplace"
          }

          return "$cleanName wooden sign by Craftygiftsplace"
        }
        "decoratie-en-sfeer" {
          if ($lowerName -match "holder|decor|burner|tealight") {
            return "$cleanName by Craftygiftsplace"
          }

          return "$cleanName wooden decor by Craftygiftsplace"
        }
        "ornamenten-en-seizoenscadeaus" {
          if ($lowerName -match "ornament") {
            return "$cleanName by Craftygiftsplace"
          }

          return "$cleanName wooden ornament by Craftygiftsplace"
        }
        default { return "$cleanName wooden gift by Craftygiftsplace" }
      }
    }
  }
}

function Get-SectionLabelNl {
  param([string]$Section)

  switch ($Section) {
    "deurhangers-en-borden" { return "Deurhangers en wanddecoratie" }
    "decoratie-en-sfeer" { return "Decoratie en sfeer" }
    "ornamenten-en-seizoenscadeaus" { return "Ornamenten en seizoenscadeaus" }
    "persoonlijke-cadeaus" { return "Persoonlijke cadeaus" }
    "kleine-cadeaus-en-diy" { return "Kleine cadeaus en knutselsets" }
    "overige-houten-cadeaus" { return "Overige houten cadeaus" }
    default { return $Section }
  }
}

function Get-ThemePhraseNl {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "dog|paw") { return "een pootjesdetail" }
      if ($joinedText -match "cat|feline") { return "een kattenmotief" }
      if ($joinedText -match "zodiac|astrology|horoscope|moon|celestial|witchy") { return "een hemelse gravure" }
      if ($joinedText -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return "een speels thema" }
      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") { return "een stoer alternatief detail" }
      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") { return "een kustdetail" }
      if ($joinedText -match "bee|honey") { return "een bijenmotief" }
      if ($joinedText -match "horse") { return "een paardenmotief" }
      if ($joinedText -match "wildlife|forest") { return "een bos- en wildlife-detail" }
      if ($joinedText -match "leaf|tree|floral|nature|rustic") { return "een natuurlijk detail" }
      if ($joinedText -match "tile|persian|mayan|samurai|viking|buddha") { return "een decoratief patroon" }
      return "een warme gravure"
    }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|lotr|tolkien") { return "een fantasy-detail" }
      if ($joinedText -match "dune|sci-fi|rocket") { return "een sci-fi accent" }
      if ($joinedText -match "celtic|lighthouse|guitar|sardine|feather") { return "een fijn gegraveerd detail" }
      return "een houten detail"
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "een opvallend detail" }
        "decoratie-en-sfeer" { return "een sfeervol detail" }
        "ornamenten-en-seizoenscadeaus" { return "een seizoensdetail" }
        "persoonlijke-cadeaus" { return "een persoonlijk detail" }
        "kleine-cadeaus-en-diy" { return "een creatief houten detail" }
        default { return "een handgemaakt houten detail" }
      }
    }
  }
}

function Get-AudiencePhraseNl {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "dog|paw") { return "hondenliefhebbers en gezellige koffietafels" }
      if ($joinedText -match "cat|feline") { return "kattenliefhebbers en knusse hoekjes" }
      if ($joinedText -match "zodiac|astrology|horoscope|moon|celestial|witchy") { return "astrologiecadeaus en warme interieurs" }
      if ($joinedText -match "chess|checkers|poker|dart|game|gaming|dnd|warcraft|counter-strike|sport|golf|fishing|formula") { return "spelhoeken, bureaus en cadeaus voor hobbyfans" }
      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") { return "liefhebbers van alternatieve decoratie en gezellige hoekjes" }
      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") { return "strandhuizen, campers en ontspannen tafelmomenten" }
      if ($joinedText -match "bee|honey") { return "tuinliefhebbers en kleine bedankcadeaus" }
      if ($joinedText -match "horse") { return "paardenliefhebbers en warme tafels" }
      if ($joinedText -match "wildlife|forest") { return "liefhebbers van rustieke woondecoratie en cadeautafels" }
      if ($joinedText -match "leaf|tree|floral|nature|rustic") { return "natuurliefhebbers, verhuiscadeaus en dagelijkse tafels" }
      if ($joinedText -match "tile|persian|mayan|samurai|viking|buddha") { return "interieurliefhebbers en tafels met karakter" }
      return "dagelijkse tafels en cadeauklare momenten" }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|lotr|tolkien") { return "fantasylezers en bijzondere boekcadeaus" }
      if ($joinedText -match "dune|sci-fi|rocket") { return "sci-fi lezers en thematische boekcadeaus" }
      return "boekenliefhebbers en rustige leesmomenten" }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "deuren, bureaus en kamers met persoonlijkheid" }
        "decoratie-en-sfeer" { return "planken, bijzettafels en gezellige huizen" }
        "ornamenten-en-seizoenscadeaus" { return "feestelijke styling en kleine betekenisvolle cadeaus" }
        "persoonlijke-cadeaus" { return "bruiloften, baby's en bijzondere mijlpalen" }
        "kleine-cadeaus-en-diy" { return "knutselhoeken, kleine cadeaus en creatieve projecten" }
        default { return "warme huizen en doordachte cadeaus" }
      }
    }
  }
}

function Get-DecisionCueNl {
  param(
    [string]$Category,
    [string]$Section,
    [string[]]$Tags,
    [string]$Name
  )

  $joinedText = (($Name + " " + ($Tags -join " ")) | Out-String).Trim().ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($joinedText -match "cat|feline|zodiac|astrology|moon|celestial|witchy") {
        return "Lasergesneden uit hout en mooi neer te leggen op een salontafel of bureau."
      }

      if ($joinedText -match "game|gaming|chess|checkers|poker|dart|formula|fishing|golf|sport") {
        return "Een praktisch themacadeau voor spelhoeken, bureaus en dagelijkse drankjes."
      }

      if ($joinedText -match "gothic|skull|spider|mushroom|cannabis|wiccan") {
        return "Een opvallend houten accent voor bureaus, bijzettafels en ruimtes met karakter."
      }

      if ($joinedText -match "anchor|coastal|camping|camper|vanlife|sea|ocean") {
        return "Een praktische houten set voor ontspannen tafelmomenten, campers en dagelijks gebruik."
      }

      if ($joinedText -match "wildlife|forest") {
        return "Een cadeauwaardig houten accent voor rustieke interieurs, koffietafels en gezellige momenten."
      }

      if ($joinedText -match "bee|leaf|tree|floral|nature|rustic|wedding|just married") {
        return "Een houten accent dat mooi past bij natuurlijke interieurs, verhuiscadeaus en ontspannen momenten."
      }

      if ($joinedText -match "horse") {
        return "Een stevige houten set die makkelijk cadeau te geven is en mooi staat in huis."
      }

      if ($joinedText -match "tile|persian|mayan|samurai|viking|buddha") {
        return "Een makkelijk cadeau voor eettafels, koffietafels en interieurs met karakter."
      }

      return "Een bruikbaar houten accent dat cadeauwaardig voelt zonder ingewikkeld te zijn."
    }
    "bladwijzers" {
      if ($joinedText -match "dragon|fantasy|witch|gothic|epic fantasy|sword") {
        return "Slank, licht en makkelijk toe te voegen aan fantasyboeken of een boekenpakket."
      }

      if ($joinedText -match "desert saga|sci-fi|rocket") {
        return "Een licht leescadeau dat netjes tussen favoriete pagina's past."
      }

      return "Slank, licht en makkelijk toe te voegen aan een favoriet boek of klein leescadeau."
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" { return "Makkelijk op te hangen en ideaal voor deuren, bureaus of knusse hoekjes met persoonlijkheid." }
        "decoratie-en-sfeer" { return "Een cadeauwaardig houten accent voor planken, bijzettafels en warme avonden thuis." }
        "ornamenten-en-seizoenscadeaus" { return "Licht, makkelijk neer te zetten en heel geschikt voor seizoenscadeaus." }
        "persoonlijke-cadeaus" { return "Mooi voor mijlpalen, herinneringen en persoonlijke cadeaumomenten." }
        "kleine-cadeaus-en-diy" { return "Een makkelijk klein cadeau voor knutselhoeken, schoencadeautjes of dagelijks gebruik." }
        default { return "Ontworpen om makkelijk cadeau te geven, neer te zetten en dagelijks van te genieten." }
      }
    }
  }
}

function Get-ProductCtaLabelNl {
  param([string]$Name)

  return "Bekijk $(Get-ShortCtaName $Name) op Etsy"
}

function Get-SensitiveCtaLabelNl {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $lower = (Normalize-Keyword $Name).ToLowerInvariant()

  switch ($Category) {
    "bladwijzers" {
      if ($lower -match "desert|space|rocket") { return "Bekijk sci-fi bladwijzers op Etsy" }
      if ($lower -match "fantasy|dragon|epic") { return "Bekijk fantasy bladwijzers op Etsy" }
      return "Bekijk houten bladwijzers op Etsy"
    }
    "onderzetters" {
      if ($lower -match "space|motorsport|tabletop|fps|mmo") { return "Bekijk thematische onderzetters op Etsy" }
      return "Bekijk houten onderzetters op Etsy"
    }
    default {
      if ($Section -eq "deurhangers-en-borden") {
        if ($lower -match "moba|mmo|fps|fantasy") { return "Bekijk gamer deurhangers op Etsy" }
        return "Bekijk houten deurhangers op Etsy"
      }

      return "Bekijk houten cadeaus op Etsy"
    }
  }
}

function Get-ProductDescriptionNl {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section,
    [string[]]$Tags
  )

  $themePhrase = Get-ThemePhraseNl -Category $Category -Section $Section -Tags $Tags -Name $Name
  $audiencePhrase = Get-AudiencePhraseNl -Category $Category -Section $Section -Tags $Tags -Name $Name
  $decisionCue = Get-DecisionCueNl -Category $Category -Section $Section -Tags $Tags -Name $Name
  $variant = Get-StableVariantIndex -Text $Name -Modulo 5

  switch ($Category) {
    "onderzetters" {
      switch ($variant) {
        0 { return "Beschermt tafels met $themePhrase en past bij $audiencePhrase. $decisionCue" }
        1 { return "Voor $audiencePhrase, met $themePhrase als warm detail. $decisionCue" }
        2 { return "Een cadeauwaardige onderzetterset die $themePhrase brengt naar $audiencePhrase. $decisionCue" }
        3 { return "Fijn voor dagelijkse drankjes en bedoeld voor $audiencePhrase, met $themePhrase. $decisionCue" }
        default { return "Houdt mokken en glazen van tafel en voegt $themePhrase toe voor $audiencePhrase. $decisionCue" }
      }
    }
    "bladwijzers" {
      switch ($variant) {
        0 { return "Houdt je pagina terugvindbaar met $themePhrase voor $audiencePhrase. $decisionCue" }
        1 { return "Een slanke houten bladwijzer voor $audiencePhrase, afgewerkt met $themePhrase. $decisionCue" }
        2 { return "Geeft een favoriet boek extra karakter met $themePhrase voor $audiencePhrase. $decisionCue" }
        3 { return "Gemaakt voor dagelijkse leesmomenten en boekcadeaus, met $themePhrase voor $audiencePhrase. $decisionCue" }
        default { return "Een doordachte bladwijzer die $themePhrase brengt naar $audiencePhrase. $decisionCue" }
      }
    }
    default {
      switch ($variant) {
        0 { return "Brengt $themePhrase naar $audiencePhrase. $decisionCue" }
        1 { return "Een houten item voor $audiencePhrase, afgewerkt met $themePhrase. $decisionCue" }
        2 { return "Een doordacht houten cadeau met $themePhrase voor $audiencePhrase. $decisionCue" }
        3 { return "Makkelijk neer te zetten en fijn om te geven, met $themePhrase voor $audiencePhrase. $decisionCue" }
        default { return "Een handgemaakt houten accent voor $audiencePhrase met $themePhrase. $decisionCue" }
      }
    }
  }
}

function Get-AltTextNl {
  param(
    [string]$Name,
    [string]$Category,
    [string]$Section
  )

  $cleanName = Normalize-Keyword $Name
  $lowerName = $cleanName.ToLowerInvariant()

  switch ($Category) {
    "onderzetters" {
      if ($lowerName -match "coaster|onderzetter") {
        return "$cleanName van Craftygiftsplace"
      }

      return "$cleanName houten onderzetter van Craftygiftsplace"
    }
    "bladwijzers" {
      if ($lowerName -match "bookmark|bladwijzer") {
        return "$cleanName van Craftygiftsplace"
      }

      return "$cleanName houten bladwijzer van Craftygiftsplace"
    }
    default {
      switch ($Section) {
        "deurhangers-en-borden" {
          if ($lowerName -match "sign|door hanger|hanger|plaque|deurbord|deurhanger|bord") {
            return "$cleanName van Craftygiftsplace"
          }

          return "$cleanName houten bord van Craftygiftsplace"
        }
        "decoratie-en-sfeer" {
          if ($lowerName -match "holder|decor|burner|tealight|theelichthouder|wierookhouder|decoratie") {
            return "$cleanName van Craftygiftsplace"
          }

          return "$cleanName houten decoratie van Craftygiftsplace"
        }
        "ornamenten-en-seizoenscadeaus" {
          if ($lowerName -match "ornament|kerstornament") {
            return "$cleanName van Craftygiftsplace"
          }

          return "$cleanName houten ornament van Craftygiftsplace"
        }
        default { return "$cleanName houten cadeau van Craftygiftsplace" }
      }
    }
  }
}

function Render-CategorySectionNl {
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

function Render-GiftSectionsNl {
  param($Products)

  $descriptions = @{
    "deurhangers-en-borden" = "Deurhangers, bordjes en houten items voor hobbykamers, bureaus en ruimtes met karakter."
    "decoratie-en-sfeer" = "Theelichthouders, wierookhouders en houten decoratie die warmte in huis brengen."
    "ornamenten-en-seizoenscadeaus" = "Seizoensornamenten en kleine herinneringscadeaus voor feestelijke en persoonlijke momenten."
    "persoonlijke-cadeaus" = "Bruiloftscadeaus, babyherinneringen en persoonlijke stukken voor bijzondere mijlpalen."
    "kleine-cadeaus-en-diy" = "Kleine houten cadeaus, creatieve setjes en speelse items die makkelijk te geven zijn."
    "overige-houten-cadeaus" = "Meer handgemaakte houten cadeaus met warmte, detail en karakter."
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
          <div class="catalog-block" id="$((Get-SectionAnchor $section))">
            <div class="catalog-header">
              <div>
                <h2>$([System.Net.WebUtility]::HtmlEncode((Get-SectionLabelNl $section)))</h2>
                <p>$([System.Net.WebUtility]::HtmlEncode($descriptions[$section]))</p>
              </div>
              <span class="chip">$($items.Count) ontwerpen</span>
            </div>
$((Render-Grid $items))
          </div>
"@
  }

  return @"
          <div class="catalog-header">
            <div>
              <h2>Alle houten cadeaus</h2>
              <p>Bekijk houten cadeaus voor gezellige huizen, mijlpalen en doordachte cadeaus, gegroepeerd per type.</p>
            </div>
            <a class="btn" href="https://www.etsy.com/shop/Craftygiftsplace?ref=dashboard-header" target="_blank" rel="noopener">Bekijk alle houten cadeaus op Etsy</a>
          </div>
          <div class="catalog-stack">
$($blocks -join "`n")
          </div>
"@
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
  $buttonLabel = [System.Net.WebUtility]::HtmlEncode(($Product.cta_label | Out-String).Trim())
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
              <img src="$image"$imageSrcSetAttr$imageSizesAttr alt="$alt" width="600" height="600" loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer" />
            </div>
            <div class="card-body">
              <div class="product-meta">
$($chips -join "`n")
              </div>
              <h3>$title</h3>
              <p>$description</p>
              <a class="btn" href="$url" target="_blank" rel="noopener" aria-label="$buttonLabel" title="$buttonLabel">$buttonLabel</a>
            </div>
          </article>
"@
}

function Render-Grid {
  param($Products)

  if (-not $Products -or $Products.Count -eq 0) {
    return '      <div class="catalog-empty">No products found for this section yet.</div>'
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
    "deurhangers-en-borden" = "Door signs, desk signs and playful wooden pieces for gaming rooms, offices and shared spaces."
    "decoratie-en-sfeer" = "Tealight holders, incense pieces and cozy wooden decor that add warmth to a room."
    "ornamenten-en-seizoenscadeaus" = "Seasonal ornaments and keepsakes for meaningful gifting and festive shelves."
    "persoonlijke-cadeaus" = "Wedding gifts, baby keepsakes and milestone pieces made for memorable moments."
    "kleine-cadeaus-en-diy" = "Small wooden gifts, creative sets and playful pieces that are easy to give or display."
    "overige-houten-cadeaus" = "More handmade wooden gifts with personality, warmth and giftable charm."
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
          <div class="catalog-block" id="$((Get-SectionAnchor $section))">
            <div class="catalog-header">
              <div>
                <h2>$([System.Net.WebUtility]::HtmlEncode((Get-SectionLabel $section)))</h2>
                <p>$([System.Net.WebUtility]::HtmlEncode($descriptions[$section]))</p>
              </div>
              <span class="chip">$($items.Count) items</span>
            </div>
$((Render-Grid $items))
          </div>
"@
  }

  return @"
          <div class="catalog-header">
            <div>
              <h2>All wooden gifts</h2>
              <p>Browse wooden gifts for cozy homes, milestone moments and thoughtful gifting, grouped by type.</p>
            </div>
            <a class="btn" href="https://www.etsy.com/shop/Craftygiftsplace?ref=dashboard-header" target="_blank" rel="noopener">View all wooden gifts on Etsy</a>
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

  Write-Utf8NoBomFile -Path $fullPath -Content $updated
}

function Write-Utf8NoBomFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$csvPath = Join-Path $repoRoot "EtsyListingsDownload.csv"
$jsonPath = Join-Path $repoRoot "data\products.json"
$jsonPathEn = Join-Path $repoRoot "data\products-en.json"

$rows = Import-Csv $csvPath
$productsEn = New-Object System.Collections.Generic.List[object]
$productsNl = New-Object System.Collections.Generic.List[object]
$dedupeKeys = New-Object System.Collections.Generic.HashSet[string]
$index = 0

foreach ($row in $rows) {
  $index++
  $category = Get-Category $row
  $section = Get-Section $row $category
  $sourceName = Get-ShortTitle $row.TITLE
  $displayName = Get-SiteDisplayName $sourceName
  $dedupeKey = "$category|$displayName"

  if (-not $dedupeKeys.Add($dedupeKey)) {
    continue
  }

  $themeText = (($row.TITLE | Out-String).Trim()) + " " + ((($row.TAGS | Out-String).Trim()))
  $isSensitiveTheme = Test-IsSensitiveTheme $themeText
  $priceValue = [decimal]::Parse($row.PRICE, [System.Globalization.CultureInfo]::InvariantCulture)
  $tags = @()

  foreach ($tag in (((($row.TAGS | Out-String).Trim())) -split ",")) {
    $humanized = Humanize-Tag $tag
    if ($humanized) {
      $tags += (Get-SafeDisplayText $humanized)
    }
    if ($tags.Count -ge 2) {
      break
    }
  }

  $slug = (($displayName.ToLowerInvariant() -replace "[^a-z0-9]+", "-" -replace "-{2,}", "-").Trim("-"))
  if ([string]::IsNullOrWhiteSpace($slug)) {
    $slug = "product-$index"
  }

  $shared = [ordered]@{
    id = $slug
    name = $displayName
    title = $displayName
    category = $category
    section = $section
    price_eur = [math]::Round([double]$priceValue, 2)
    price_label = Get-PriceLabel $row.PRICE
    tags = @()
    image = Get-CardImageSource $row.IMAGE1
    image_full = $row.IMAGE1
    image_srcset = Get-CardImageSrcSet $row.IMAGE1
    image_sizes = Get-CardImageSizes
    category_url = Get-CategoryUrl $category
  }

  $etsyUrl = if ($isSensitiveTheme) { Get-EtsyUrl (Get-SensitiveBrowseQuery -Name $displayName -Category $category -Section $section) } else { Get-EtsyUrl $sourceName }

  $productEn = [ordered]@{} + $shared
  $productEn.page = if ($category -eq "onderzetters") { "../pages/wooden-coasters.html#shop-catalog" } elseif ($category -eq "bladwijzers") { "../pages/wooden-bookmarks.html#shop-catalog" } else { "../pages/wooden-gifts.html#shop-catalog" }
  $productEn.tags = Get-UiTags -Category $category -Section $section -Tags $tags -Name $displayName
  $productEn.description = Get-ProductDescription -Name $displayName -Category $category -Section $section -Tags $tags
  $productEn.alt = Get-AltText -Name $displayName -Category $category -Section $section
  $productEn.cta_label = if ($isSensitiveTheme) { Get-SensitiveCtaLabel -Name $displayName -Category $category -Section $section } else { Get-ProductCtaLabel $displayName }
  $productEn.etsy_url = $etsyUrl

  $displayNameNl = Get-SiteDisplayNameNl -Name $displayName -Category $category -Section $section

  $productNl = [ordered]@{} + $shared
  $productNl.name = $displayNameNl
  $productNl.title = $displayNameNl
  $productNl.page = if ($category -eq "onderzetters") { "../pages/onderzetters.html#shop-catalog" } elseif ($category -eq "bladwijzers") { "../pages/bladwijzers.html#shop-catalog" } else { "../pages/houten-cadeaus.html#shop-catalog" }
  $productNl.tags = Get-UiTagsNl -Category $category -Section $section -Tags $tags -Name $displayNameNl
  $productNl.description = Get-ProductDescriptionNl -Name $displayNameNl -Category $category -Section $section -Tags $tags
  $productNl.alt = Get-AltTextNl -Name $displayNameNl -Category $category -Section $section
  $productNl.cta_label = if ($isSensitiveTheme) { Get-SensitiveCtaLabelNl -Name $displayNameNl -Category $category -Section $section } else { Get-ProductCtaLabelNl $displayNameNl }
  $productNl.etsy_url = $etsyUrl

  $productsEn.Add([pscustomobject]$productEn) | Out-Null
  $productsNl.Add([pscustomobject]$productNl) | Out-Null
}

Write-Utf8NoBomFile -Path $jsonPath -Content (($productsNl | ConvertTo-Json -Depth 6) + "`n")
Write-Utf8NoBomFile -Path $jsonPathEn -Content (($productsEn | ConvertTo-Json -Depth 6) + "`n")

$underzettersNl = @($productsNl | Where-Object { $_.category -eq "onderzetters" })
$bladwijzersNl = @($productsNl | Where-Object { $_.category -eq "bladwijzers" })
$cadeausNl = @($productsNl | Where-Object { $_.category -eq "houten-cadeaus" })

$underzettersHtmlNl = Render-CategorySectionNl `
  -Heading "Alle houten onderzetters" `
  -Description "Bekijk $($underzettersNl.Count) houten onderzetterontwerpen voor gezellige huizen, kattenliefhebbers, verhuiscadeaus en tafels met karakter." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster" `
  -ButtonLabel "Bekijk alle onderzetters op Etsy" `
  -Products $underzettersNl

$bladwijzersHtmlNl = Render-CategorySectionNl `
  -Heading "Alle houten bladwijzers" `
  -Description "Bekijk $($bladwijzersNl.Count) houten bladwijzers voor lezers, fantasyfans, sci-fi cadeaus en doordachte boekgeschenken." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" `
  -ButtonLabel "Bekijk alle bladwijzers op Etsy" `
  -Products $bladwijzersNl

$cadeausHtmlNl = Render-GiftSectionsNl $cadeausNl

Replace-MarkerBlock -Path "pages\onderzetters.html" -Marker "AUTO-CATALOG-ONDERZETTERS" -Content $underzettersHtmlNl
Replace-MarkerBlock -Path "pages\bladwijzers.html" -Marker "AUTO-CATALOG-BLADWIJZERS" -Content $bladwijzersHtmlNl
Replace-MarkerBlock -Path "pages\houten-cadeaus.html" -Marker "AUTO-CATALOG-HOUTEN-CADEAUS" -Content $cadeausHtmlNl

$underzettersEn = @($productsEn | Where-Object { $_.category -eq "onderzetters" })
$bladwijzersEn = @($productsEn | Where-Object { $_.category -eq "bladwijzers" })
$cadeausEn = @($productsEn | Where-Object { $_.category -eq "houten-cadeaus" })

$underzettersHtmlEn = Render-CategorySection `
  -Heading "All wooden coasters" `
  -Description "Browse $($underzettersEn.Count) wooden coaster designs for cozy homes, cat lovers, housewarming gifts and themed tables." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster" `
  -ButtonLabel "View all coasters on Etsy" `
  -Products $underzettersEn

$bladwijzersHtmlEn = Render-CategorySection `
  -Heading "All wooden bookmarks" `
  -Description "Browse $($bladwijzersEn.Count) wooden bookmarks for readers, fantasy fans, sci-fi gifts and thoughtful book lovers." `
  -ButtonUrl "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" `
  -ButtonLabel "View all bookmarks on Etsy" `
  -Products $bladwijzersEn

$cadeausHtmlEn = Render-GiftSections $cadeausEn

Replace-MarkerBlock -Path "en\pages\wooden-coasters.html" -Marker "AUTO-CATALOG-ONDERZETTERS" -Content $underzettersHtmlEn
Replace-MarkerBlock -Path "en\pages\wooden-bookmarks.html" -Marker "AUTO-CATALOG-BLADWIJZERS" -Content $bladwijzersHtmlEn
Replace-MarkerBlock -Path "en\pages\wooden-gifts.html" -Marker "AUTO-CATALOG-HOUTEN-CADEAUS" -Content $cadeausHtmlEn
